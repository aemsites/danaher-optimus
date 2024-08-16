import {
  div, h2, span, button, img, ul, li, a,
  input, table, thead, tbody, tr, th, td,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { decorateModals } from '../../scripts/modal.js';
import { getProductResponse } from '../../scripts/search.js';
import { decorateDrawer, showDrawer } from '../../scripts/drawer.js';
import { debounce, paginateData, paginateIndexes } from '../../scripts/scripts.js';

let drawerContent;
const perPageList = 10;
const publicationsData = [];
const publicationFilterByFields = ['name', 'journal'];
const dataContainer = ul({ class: 'h-3/4 space-y-4 my-3 overflow-y-auto' });
const nextBtn = li({ class: 'p-2 rounded-full -rotate-90', title: 'Next' }, span({ class: 'icon icon-chevron-down block size-4' }));
const prevBtn = li({ class: 'p-2 rounded-full rotate-90', title: 'Previous' }, span({ class: 'icon icon-chevron-down block size-4' }));
const paginateIndexesTag = ul(
  { class: 'flex justify-center text-sm items-center gap-2 [&_.active]:bg-gray-400/30 hover:[&_li]:bg-gray-400/30' },
  prevBtn,
  nextBtn,
);

function decoratePaginateIndexes({ list, currentPage, element }) {
  const indexesArr = paginateIndexes({
    listLength: list.length, currentPage, perPage: perPageList,
  });
  return indexesArr.map((indexNum) => {
    const isEllipsis = typeof indexNum === 'string';
    const liTag = li(
      { class: `px-4 py-2 rounded-full ${isEllipsis ? 'cursor-not-allowed' : 'cursor-pointer'} ${currentPage === indexNum ? 'active' : ''}` },
      indexNum,
    );
    if (!isEllipsis) {
      liTag.setAttribute('title', indexNum);
      liTag.addEventListener(
        'click',
        // eslint-disable-next-line no-use-before-define
        () => decorateAllPublications({
          el: element, jsonData: list, currentPage: indexNum, perPage: perPageList,
        }),
      );
    }
    return liTag;
  });
}

function decorateAllPublications({
  el, jsonData, currentPage = 1, perPage = perPageList,
}) {
  const paginatedList = paginateData(jsonData, currentPage, perPage);
  dataContainer.innerHTML = '';
  paginatedList.forEach((list) => {
    const newDate = new Date(list.publicationDate);
    const liTag = li(
      { class: 'flex gap-4' },
      div(
        { class: 'min-h-32 flex flex-col justify-between flex-1 p-4 font-normal text-sm rounded-lg border bg-white' },
        div(
          { class: 'flex justify-between text-xs text-gray-400 font-semibold' },
          span(`${list.journal} ${list.pages}`),
          span(newDate.getFullYear()),
        ),
        div({ class: 'text-black py-2' }, list.name),
        div(
          { class: 'flex flex-col gap-y-2 text-xs text-gray-400 font-semibold' },
          list.authors && list.authors.length > 0 && div(list.authors[0]),
          a({ class: 'flex gap-x-1 shrink-0 hover:underline', href: '#' }, `PubMed ${list.pubmedId}`),
        ),
      ),
    );
    dataContainer.append(liTag);
  });
  if (el) {
    if (el.querySelector('ul')) el.querySelector('ul').outerHTML = dataContainer.outerHTML;
    else el.append(dataContainer);
    while (prevBtn.nextSibling && prevBtn.parentNode.children.length > 2) {
      prevBtn.parentNode.removeChild(prevBtn.nextSibling);
    }
    prevBtn.after(...decoratePaginateIndexes({ list: jsonData, currentPage, element: el }));
    if (currentPage === 1 || jsonData.length === 0 || jsonData.length <= perPage) {
      prevBtn.classList.remove('cursor-pointer');
      prevBtn.classList.add('cursor-not-allowed');
    } else {
      prevBtn.classList.remove('cursor-not-allowed');
      prevBtn.classList.add('cursor-pointer');
      prevBtn.addEventListener(
        'click',
        () => decorateAllPublications({
          el, jsonData, currentPage: (currentPage - 1), perPage: perPageList,
        }),
      );
    }
    if (
      Math.ceil(publicationsData.length / perPageList) === currentPage
      || jsonData.length === 0
      || jsonData.length <= perPage
    ) {
      nextBtn.classList.remove('cursor-pointer');
      nextBtn.classList.add('cursor-not-allowed');
    } else {
      nextBtn.classList.remove('cursor-not-allowed');
      nextBtn.classList.add('cursor-pointer');
      nextBtn.addEventListener(
        'click',
        () => decorateAllPublications({
          el, jsonData, currentPage: (currentPage + 1), perPage: perPageList,
        }),
      );
    }
  }
}

const filterPublications = debounce(async (event, jsonData) => {
  const { value } = event.target;
  const filterPublicationData = jsonData.filter((data) => {
    const conclusion = publicationFilterByFields.map((kys) => data[kys].includes(value));
    return conclusion.includes(true);
  });
  decorateAllPublications({
    el: drawerContent, jsonData: filterPublicationData, currentPage: 1, perPage: perPageList,
  });
}, 800);

const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'Tested') return '/icons/tested.svg';
  if (reactivityType === 'REACTS') return '/icons/expected.svg';
  if (reactivityType === 'EXPECTED_TO_REACT') return '/icons/predicted.svg';

  return '/icons/not-recommended.svg';
};

const getTableCSS = (reactivityType) => (reactivityType === 'Tested' ? 'size-6' : 'size-3');

function productPromise() {
  return div(
    { class: 'product-promise-section font-semibold text-sm p-4 bg-white gap-y-4 justify-between flex items-center mb-4 max-[959px]:flex-col max-[959px]:w-[100%] max-[959px]:items-start' },
    div(
      { class: 'relative gap-x-6 gap-y-4 flex flex-wrap text-xs' },
      span({ class: 'tracking-wide gap-x-2 flex items-center max-[959px]:w-full' }, 'Product promise'),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'size-8', src: '/icons/tested.svg', alt: 'Reactivity Tested' }),
        'Tested',
      ),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'size-4', src: '/icons/expected.svg', alt: 'Reactivity Expected' }),
        'Expected',
      ),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'size-3', src: '/icons/predicted.svg', alt: 'Reactivity Predicted' }),
        'Predicted',
      ),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'size-3', src: '/icons/not-recommended.svg', alt: 'Reactivity Not Recommended' }),
        'Not recommended',
      ),
    ),
    decorateModals(a(
      { class: 'button h-8 flex items-center gap-x-2 rounded-full px-3 py-2 text-base tracking-wide border border-black', href: '/modals/product-promise' },
      span({ class: 'learnmore align-center' }, 'Learn more'),
      img({ class: 'size-4', src: '/icons/plus.svg', alt: 'plus' }),
    )),
  );
}

function publicationsAndImageSection({
  images, publicationArray, allPublicationCount = 0, allImageCount = 0,
}) {
  const publicationsContent = ul({ class: 'space-y-4' });
  const imagesContent = ul({ class: 'grid grid-cols-3 gap-4' });

  if (publicationArray && publicationArray.length > 0) {
    publicationArray.forEach((pub) => {
      publicationsContent.appendChild(
        li(
          { class: 'flex-col font-normal text-sm p-4 border-t bg-white rounded-lg justify-between min-h-32' },
          div(
            { class: 'flex justify-between text-xs text-gray-700 font-semibold' },
            span(`${pub.journal}:${pub.volume}:${pub.pages}`),
            span({ class: 'text-right' }, pub.publicationDate.substring(0, 4)),
          ),
          div({ class: 'text-black py-2' }, pub.name),
          div({ class: 'flex text-gray-700 font-semibold text-xs' }, pub.authors),
          a(
            {
              class: 'flex gap-x-1 text-gray-700 py-2 hover:underline',
              target: '_blank',
              href: `https://pubmed.ncbi.nlm.nih.gov/37192628/${pub.pubmedId}`,
            },
            img({ class: 'size-3', src: '/icons/share-icon.svg', alt: 'Share Link' }),
            `PubMed ${pub.pubmedId}`,
          ),
        ),
      );
    });
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      imagesContent.append(
        li(
          { class: 'relative inline-flex cursor-pointer' },
          img({ src: image, alt: 'Product Detail Graphic', class: 'size-full shadow-lg rounded aspect-square' }),
          div(
            { class: 'absolute size-full hover:bg-gray-800/50 rounded transition duration-300' },
            span({ class: 'absolute size-4 bottom-2 right-2 icon icon-Expand' }),
          ),
        ),
      );
    });
  }

  return div(
    { class: 'flex flex-col lg:flex-row mt-6 gap-y-6 gap-x-8' },
    div(
      { class: 'w-full space-y-4' },
      div(
        { class: 'flex items-center justify-between' },
        h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Publications'),
        button(
          {
            type: 'button',
            onclick: () => allPublicationCount > 0 && showDrawer('drawer-eg'),
            class: 'inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-black/80 rounded-full hover:bg-black/90',
          },
          'View all',
          span(
            { class: 'inline-flex items-center justify-center h-4 ms-2 p-1 text-xs font-semibold tracking-wider bg-neutral-500/50 rounded-full' },
            allPublicationCount,
          ),
        ),
      ),
      publicationsContent,
    ),
    div(
      { class: 'w-full space-y-4' },
      div(
        { class: 'flex items-center justify-between' },
        h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Images'),
        button(
          {
            type: 'button',
            onclick: () => allImageCount > 0 && showDrawer('drawer-eg'),
            class: 'inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-black/80 rounded-full hover:bg-black/90',
          },
          'View all',
          span(
            { class: 'inline-flex items-center justify-center h-4 ms-2 p-1 text-xs font-semibold tracking-wider bg-neutral-500/50 rounded-full' },
            allImageCount,
          ),
        ),
      ),
      imagesContent,
    ),
  );
}

function allApplicationTableData(tableData, application) {
  const allTabData = div({ class: 'overflow-scroll' });
  const tableHead = thead();
  const headRow = tr(th({ class: 'font-semibold text-black text-sm text-left bg-white p-4 boarder border-b-2 max-[959px]:p-2' }));
  application.forEach((name) => {
    headRow.appendChild(th({ class: 'font-semibold text-black text-sm text-left bg-white p-4 boarder border-b-2 max-[959px]:p-2' }, name));
  });
  tableHead.appendChild(headRow);
  const tableBody = tbody();
  const tableEl = table({ class: 'table-auto lg:table-fixed w-full border-separate indent-2' }, tableHead);
  tableData.forEach((row) => {
    const rowObj = JSON.parse(row);
    const tablerow = tr();
    tablerow.appendChild(th(
      { class: 'p-4 font-normal text-left bg-white w-1/5 max-[959px]:p-2' },
      span({ class: 'text-sm font-semibold' }, rowObj?.species),
    ));
    application.forEach((name) => {
      const tableCell = td(
        { class: 'p-4 font-normal text-left bg-white w-1/5' },
        img({
          class: getTableCSS(rowObj[name]),
          src: getReactivityStatus(rowObj[name]),
          alt: rowObj[name],
        }),
      );
      tablerow.appendChild(tableCell);
    });
    tableBody.appendChild(tablerow);
    tableEl.appendChild(tableBody);
  });
  allTabData.appendChild(tableEl);
  return allTabData;
}

export default async function decorate(block) {
  block.classList.add(...'mx-auto w-[87%] max-[768px]:w-full'.split(' '));
  const response = await getProductResponse();
  const {
    reactivitytabledata = [], publicationsjson = '', images = [],
    reactivityapplications, numpublications,
  } = response[0].raw;
  const parsedPublications = JSON.parse(publicationsjson);
  if (
    reactivityapplications
    && (typeof parsedPublications === 'object' && parsedPublications.length > 0)
    && images.length > 0
  ) {
    const reactivityData = div(
      { class: 'relative w-full box-content ' },
      h2({ class: 'font-semibold text-black text-[24px] leading-[1.33] tracking-[-.03125rem] mb-4' }, 'Reactivity Data'),
      span({ class: 'text-base tracking-wide mb-4' }, 'Select an application'),
    );
    const buttonsPanel = div(
      { class: 'flex gap-2 flex-wrap text-black tracking-[2px] font-semibold text-sm pb-5 max-[959px]:w-[100%]' },
      button({ class: 'px-6 py-3 border-black boarder-solid  bg-black text-white font-semibold rounded-[28px] tracking-[.2px]' }, 'All applications'),
    );
    reactivityapplications.forEach((name) => {
      buttonsPanel.appendChild(button({ class: 'px-6 py-3 border border-black text-black font-semibold rounded-[28px] tracking-[.2px]' }, name));
    });
    const reactivityApplicationWrapper = div({ class: 'reactivityApplicationWrapper w-full mt-4' });
    reactivityApplicationWrapper.appendChild(buttonsPanel);
    const productInfo = productPromise();
    reactivityApplicationWrapper.appendChild(productInfo);
    const reactivityJson = reactivitytabledata;
    const tableContent = allApplicationTableData(reactivityJson, reactivityapplications);
    reactivityApplicationWrapper.appendChild(tableContent);
    const filteredPublications = paginateData(parsedPublications, 1, 2);
    const filteredImages = paginateData(images, 1, 3);
    const blockSection = publicationsAndImageSection({
      images: filteredImages,
      publicationArray: filteredPublications,
      allPublicationCount: numpublications,
      allImageCount: images.length,
    });
    const searchBar = div(
      { class: 'relative' },
      input({
        type: 'text',
        class: 'block w-full py-2 pl-3 pe-8 text-sm text-gray-600 tracking-wide bg-white border border-slate-300 focus-visible:outline-none focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-full',
        placeholder: 'Search by topic, author or PubMed ID',
        onkeyup: (e) => filterPublications(e, parsedPublications),
      }),
      span({ class: 'icon icon-search w-5 h-5 absolute end-2.5 bottom-2.5 cursor-pointer' }),
    );
    const drawerEl = await decorateDrawer({ id: 'drawer-eg', title: 'Publications', isBackdrop: true });
    drawerContent = drawerEl.querySelector('#drawer-eg .drawer-body');
    if (drawerContent) {
      drawerContent.append(searchBar);
      decorateAllPublications({ el: drawerContent, jsonData: parsedPublications });
      drawerContent.append(paginateIndexesTag);
    }
    decorateIcons(drawerEl);
    reactivityApplicationWrapper.appendChild(blockSection);
    block.append(drawerEl);
    block.append(reactivityData);
    block.appendChild(reactivityApplicationWrapper);
    decorateIcons(block);
  }
}

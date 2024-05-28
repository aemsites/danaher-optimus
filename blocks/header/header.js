import {
  div, button, span, a, ul, li, h4,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function showFlyoutMenu() {
  document.querySelector('#menu-flyout')?.classList.remove('hidden');
}

function hideFlyoutMenu() {
  document.querySelector('#menu-flyout')?.classList.add('hidden');
}

function sortFlyoutMenus(menuPath) {
  const menuList = document.querySelector('#menu-flyout ul');
  const heading = menuPath.split('|');
  if (heading) document.querySelector('#menu-flyout h4').textContent = heading[heading.length - 1];
  [...menuList.children].forEach((menu) => {
    if (menu.getAttribute('data-content') !== menuPath && menu.getAttribute('data-content') !== menuPath) {
      menu.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
      const href = menu.getAttribute('data-href');
      const backFlyout = document.querySelector('#back-flyout');
      const exploreFlyout = document.querySelector('#explore-flyout');
      const redirectLink = menu.getAttribute('data-content').split('|').slice(0, -1).join('|');
      if (redirectLink) {
        backFlyout.setAttribute('data-redirect', redirectLink);
        backFlyout.classList.remove('hidden');
      } else backFlyout.classList.add('hidden');
      if (href) {
        exploreFlyout.setAttribute('href', href);
        exploreFlyout.classList.remove('hidden');
      } else exploreFlyout.classList.add('hidden');
    }
  });
}

function toggleSearchBoxMobile(e) {
  e.preventDefault();
  const searchBox = document.querySelector('.mobile-search');
  searchBox.classList.toggle('hidden');
  searchBox.closest('.navbar-wrapper')?.classList.toggle('pb-0');
  if (!searchBox.classList.contains('show')) searchBox.querySelector('input').focus();
}

function buildFlyoutMenus(headerBlock) {
  const allFlyout = headerBlock.querySelectorAll('.menu-flyout');
  const closeFlyout = button({ class: 'flex ml-auto mx-2 p-1 rounded hover:bg-white' }, span({ class: 'icon icon-x w-6 h-6 [&_svg>use]:stroke-2 [&_svg>use]:bg-white' }));
  const mobileCloseSvgIcon = closeFlyout.querySelector('button > span');
  mobileCloseSvgIcon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Close mobile menu">
    <path fill="#273F3F" fill-rule="evenodd" d="M4.293 19.707c.39.39 1.024.39 1.414 0L12 13.414l6.293 6.293c.39.39 1.024.39 1.414 0 .39-.39.39-1.024 0-1.414L13.414 12l6.293-6.293c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0L12 10.586 5.707 4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414L10.586 12l-6.293 6.293c-.39.39-.39 1.024 0 1.414z" clip-rule="evenodd"></path>
  </svg>
  `;
  closeFlyout.addEventListener('click', hideFlyoutMenu);

  const backFlyout = button({ id: 'back-flyout', class: 'flex items-center gap-x-1 group' }, span({ class: 'icon icon-arrow-left [&_svg>use]:stroke-danaherpurple-500 w-4 h-4 transition-transform group-hover:translate-x-0.5' }), 'Back');
  backFlyout.addEventListener('click', () => sortFlyoutMenus(backFlyout.getAttribute('data-redirect')));

  const exploreFlyout = a({ id: 'explore-flyout', class: 'flex items-center gap-x-1 group', href: '#' }, 'Explore all', span({ class: 'icon icon-arrow-right [&_svg>use]:stroke-danaherpurple-500 w-4 h-4 transition-transform group-hover:-translate-x-0.5' }));

  const navigateActions = div(
    { class: 'flex justify-between text-base text-white font-bold mx-2' },
    backFlyout,
    exploreFlyout,
  );

  decorateIcons(closeFlyout);
  decorateIcons(backFlyout);
  decorateIcons(exploreFlyout);

  const menuWrapper = ul({ class: 'h-full flex flex-col text-white gap-y-2 mt-3 overflow-auto [&>li.active]:bg-danaherpurple-50 [&>li.active]:font-bold' });
  [...allFlyout].forEach((flyMenu) => {
    const contentText = flyMenu.children[0]?.textContent;
    const anchorHref = flyMenu.children[0].querySelector('a')?.href;

    [...flyMenu.children[0].children].map((flyMenuChild) => {
      const contextPath = `${contentText}|${flyMenuChild.textContent}`;
      const liTag = li(
        {
          class: 'inline-flex justify-between items-center hover:bg-danaherpurple-50 font-extralight text-base hover:font-medium tracking-wider px-2 py-2 select-none cursor-pointer [&>a]:w-full transition group',
          'data-content': contentText,
          ...(anchorHref && { 'data-href': anchorHref }),
        },
      );
      if (flyMenuChild.querySelector('span.icon')) {
        liTag.setAttribute('data-redirect', contextPath);
        liTag.innerHTML += flyMenuChild.textContent;
        liTag.append(span({ class: 'icon icon-arrow-right shrink-0 [&_svg>use]:stroke-danaherpurple-500 [&_svg>use]:hover:stroke-black w-4 h-4 group-hover:-translate-x-0.5' }));
        liTag.addEventListener('click', () => sortFlyoutMenus(contextPath));
      } else liTag.append(a({ href: flyMenuChild.querySelector('a')?.href }, flyMenuChild.textContent));
      decorateIcons(liTag);
      menuWrapper.append(liTag);
      return flyMenuChild;
    });
    flyMenu.outerHTML = '';
  });

  const flyout = div(
    {
      id: 'menu-flyout',
      class: 'w-full hidden fixed top-0 left-0 z-40 h-screen transition-all ease-out backdrop-brightness-50',
    },
    div(
      { class: 'w-[360px] max-w-sm fixed h-full bg-black px-3 py-4 ease-out transition-all' },
      closeFlyout,
      h4({ class: 'text-2xl font-medium text-white mt-0 mx-2 mb-2' }, 'Flyout Menu Heading'),
      navigateActions,
      div({ class: 'border-b border-white py-2 mx-2' }),
      menuWrapper,
    ),
  );
  flyout.addEventListener('click', (event) => {
    if (event.target.id === 'menu-flyout') hideFlyoutMenu();
  });
  return flyout;
}

function buildSearchBlockMobile() {
  const searchBlockMobile = div(
    { class: 'mobile-search w-full bg-black py-4 hidden md:hidden' },
    div(
      { class: 'flex items-center gap-2 md:block mx-6 lg:my-4' },
      div({ class: 'close', onclick: toggleSearchBoxMobile }, span({ class: 'icon icon-close [&_svg]:stroke-white' })),
    ),
  );
  const closeSvgIcon = searchBlockMobile.querySelector('.mobile-search > .flex > .close > .icon');
  closeSvgIcon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Close mobile menu">
    <path fill="#273F3F" fill-rule="evenodd" d="M4.293 19.707c.39.39 1.024.39 1.414 0L12 13.414l6.293 6.293c.39.39 1.024.39 1.414 0 .39-.39.39-1.024 0-1.414L13.414 12l6.293-6.293c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0L12 10.586 5.707 4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414L10.586 12l-6.293 6.293c-.39.39-.39 1.024 0 1.414z" clip-rule="evenodd"></path>
  </svg>
  `;
  return searchBlockMobile;
}

function buildSearchBlock(headerBlock) {
  const searchHtmlBlock = headerBlock.children[0];
  searchHtmlBlock.classList.add(...'navbar-wrapper bg-black z-50 py-2 md:py-4 lg:pt-8 lg:pb-2 mb-[2px] space-y-2 shadow-sm'.split(' '));
  searchHtmlBlock.id = 'sticky-header';
  // const searchHtmlBlockInner = div({ class: 'w-full flex flex-row flex-wrap justify-between' });
  const searchNewBlock = div({ class: 'bg-black flex justify-between pr-4 mx-auto max-w-7xl flex-row lg:px-8' });
  const extendedSectionBlock = div({ class: 'extended-section md:w-full grid grid-rows-1 lg:grid-rows-2 ml-auto md:ml-14 mr-2 md:mr-4' });
  extendedSectionBlock.id = 'extended-section';
  // searchHtmlBlockInner.innerHTML = headerBlock.children[1].innerHTML;
  console.log(searchHtmlBlock);
  const logoPictureBlock = searchHtmlBlock.querySelector(':scope > p > a');
  const logoPictureBlockIcon = span({class: 'icon icon-logo'});
  if (window.location.pathname === '/') logoPictureBlock.href = 'https://www.abcam.com/en-in';

  const hamburgerIcon = button(
    {
      id: 'nav-hamburger',
      type: 'button',
      class: 'open-side-menu block lg:hidden btn btn-sm h-full my-auto bg-white hover:bg-white text-danaherpurple-500 hover:text-danaherpurple-800',
      'aria-label': 'Menu',
      'aria-expanded': false,
      'aria-controls': 'mega-menu-icons',
      'data-collapse-toggle': 'mega-menu-icons',
    },
    span({ class: 'icon icon-nav-hamburger'}),
  );

  searchNewBlock.append(hamburgerIcon);
  logoPictureBlock.append(logoPictureBlockIcon);
  searchNewBlock.append(logoPictureBlock);
  decorateIcons(logoPictureBlock);
  decorateIcons(hamburgerIcon);
  // extendedSectionBlock.append(searchHtmlBlockInner);
  searchNewBlock.append(extendedSectionBlock);
  searchHtmlBlock.innerHTML = searchNewBlock.outerHTML;

  searchHtmlBlock.append(buildSearchBlockMobile());

  searchHtmlBlock.querySelector('#nav-hamburger').addEventListener('click', (e) => {
    e.preventDefault();
    showFlyoutMenu();
    sortFlyoutMenus('Menu');
  });
}

function buildNavBlock(headerBlock) {
  const extendedSectionBlock = headerBlock.querySelector('div.extended-section');
  const menuLinks = [];
  [...headerBlock.children].slice(1).forEach((menuItemEl) => {
    menuItemEl.className = menuItemEl.innerHTML ? 'menu-flyout hidden' : '';
    if (menuItemEl.querySelector('p')?.textContent === 'Menu') {
      menuItemEl.querySelectorAll('ul > li').forEach((childMenuItem) => {
        menuLinks.push(childMenuItem);
      });
    }
  });
  const navHtmlBlock = div({ class: 'mega-menu-off-scroll hidden lg:flex items-center gap-x-8' });

  menuLinks.forEach((item) => {
    const menuItemName = item.innerText;
    const expandIcon = item.querySelector('span.icon-chevron-up-white');
    const menuItemEl = a(
      {
        class: 'btn relative bg-black hover:bg-black text-white font-medium ring-0 border-0 ring-offset-0 group',
        href: item.querySelector('a')?.href || '#',
      },
      menuItemName,
    );
    const arrowDownIcon = span({class: 'icon icon-chevron-up-white'});
    menuItemEl.append(arrowDownIcon);
    decorateIcons(menuItemEl);
    if (expandIcon) {
      menuItemEl.append(span({ class: 'icon icon-chevron-down-white [&_svg>use]:stroke-danaherpurple-500 transition group-hover:rotate-180 ml-1' }));
      menuItemEl.addEventListener('click', (e) => {
        e.preventDefault();
        showFlyoutMenu();
        sortFlyoutMenus(`Menu|${menuItemName}`);
      });
    }
   // decorateIcons(expandIcon);

    navHtmlBlock.append(menuItemEl);
  });
  extendedSectionBlock.append(navHtmlBlock);
}

function handleScroll() {
  const stickyHeader = document.getElementById('sticky-header');
  const hamburgerIcon = document.getElementById('nav-hamburger');
  const extendedSection = document.getElementById('extended-section');
  const megaMenus = stickyHeader.querySelector('.mega-menu-off-scroll');
  const brandLogo = stickyHeader.querySelector('.brand-logo');
  if (window.scrollY >= 95) {
    stickyHeader.classList.add('remove-descedents', 'fixed', 'inset-x-0', 'top-0', 'w-full', 'lg:!pb-4', 'shadow-lg');
    stickyHeader.firstElementChild.classList.add('bg-black');
    hamburgerIcon?.classList.remove('lg:hidden');
    hamburgerIcon?.classList.add('lg:block');
    extendedSection?.classList.remove('lg:lg:grid-rows-2');
    extendedSection?.classList.add('lg:lg:grid-rows-1');
    megaMenus?.classList.remove('lg:block');
    megaMenus?.classList.add('lg:hidden');
    brandLogo?.classList.remove('h-full');
    brandLogo?.classList.add('h-10');
  } else if (window.scrollY < 95) {
    stickyHeader.classList.remove('remove-descedents', 'fixed', 'inset-x-0', 'top-0', 'w-full', 'lg:!pb-4', 'shadow-lg');
    stickyHeader.firstElementChild.classList.remove('bg-danaherblue-600');
    hamburgerIcon?.classList.add('lg:hidden');
    hamburgerIcon?.classList.remove('lg:block');
    extendedSection?.classList.remove('lg:lg:grid-rows-1');
    extendedSection?.classList.add('lg:lg:grid-rows-2');
    megaMenus?.classList.remove('lg:hidden');
    megaMenus?.classList.add('lg:block');
    brandLogo?.classList.remove('h-10');
    brandLogo?.classList.add('h-full');
  }
}

export default async function decorate(block) {
  const resp = await fetch('/nav.plain.html');

  if (resp.ok) {
    const html = await resp.text();

    // build header DOM
    const headerBlock = div({ class: 'nav-container pt-0 pb-0 md:p-0 bg-black relative z-20' });
    headerBlock.innerHTML = html;
    buildSearchBlock(headerBlock);
    buildNavBlock(headerBlock);

    const flyout = buildFlyoutMenus(headerBlock);

    window.addEventListener('scroll', handleScroll);
    block.innerHTML = '';
    block.append(headerBlock);
    block.append(flyout);
  }

  return block;
}

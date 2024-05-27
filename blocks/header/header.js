import { div, button, span, a, ul, li, h4 } from '../../scripts/dom-builder.js';
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
  `
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
  console.log(flyout);
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
  `
  return searchBlockMobile;
}

function buildSearchBlock(headerBlock) {
  const searchHtmlBlock = headerBlock.children[0];
  searchHtmlBlock.classList.add(...'navbar-wrapper lg:h-[100px] bg-black z-50 py-2 md:py-4 lg:pt-8 lg:pb-2 mb-[2px] space-y-2 shadow-sm'.split(' '));
  searchHtmlBlock.id = 'sticky-header';
  //const searchHtmlBlockInner = div({ class: 'w-full flex flex-row flex-wrap justify-between' });
  const searchNewBlock = div({ class: 'bg-black flex justify-between pr-4 mx-auto max-w-7xl flex-row lg:px-8' });
  const extendedSectionBlock = div({ class: 'extended-section md:w-full grid grid-rows-1 lg:grid-rows-2 ml-auto md:ml-14 mr-2 md:mr-4' });
  extendedSectionBlock.id = 'extended-section';
  //searchHtmlBlockInner.innerHTML = headerBlock.children[1].innerHTML;

  const logoPictureBlock = searchHtmlBlock.querySelector(':scope > p > a');
  logoPictureBlock.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="25" fill="none" viewBox="0 0 120 25" data-cy="abcam-logo" data-testid="abcam-logo" class="cursor-pointer">
    <path fill="#FFFFFF" d="M14.902 15.47c0 2.924-2.417 5.307-5.448 5.307-2.923 0-5.304-2.347-5.304-5.234 0-2.924 2.417-5.27 5.376-5.27 2.959 0 5.376 2.31 5.376 5.198zm4.078-5.125h2.31V6.519h-6.424v2.563c-1.48-1.986-3.247-2.852-5.7-2.852C4.15 6.23 0 10.49 0 15.615c0 5.053 4.077 9.168 9.02 9.168 2.527 0 4.33-.794 5.846-2.67v2.382h6.423v-3.827h-2.31V10.345zm21.289 5.053c0 3.069-2.418 5.595-5.413 5.595s-5.485-2.563-5.485-5.595c0-2.96 2.418-5.342 5.449-5.342 3.031 0 5.449 2.383 5.449 5.342zM29.588.455h-6.422V4.28h2.309v16.387h-2.31v3.827h6.423v-2.672c1.624 2.094 3.428 2.96 5.954 2.96 4.835 0 8.876-4.187 8.876-9.24 0-5.09-4.185-9.313-9.237-9.313-2.418 0-4.15.902-5.593 2.888V.455zm33.69 6.064h-3.536v1.768c-1.516-1.552-3.103-2.237-5.124-2.274-4.944 0-9.093 4.368-9.093 9.494 0 5.234 4.258 9.493 9.454 9.493 4.113 0 7.65-2.563 8.984-6.533h-4.582c-.83 1.588-2.382 2.526-4.33 2.526-2.995 0-5.377-2.418-5.377-5.45s2.346-5.487 5.269-5.487c1.804 0 3.32.83 4.51 2.455h3.825V6.519zm16.526 8.952c0 2.923-2.418 5.306-5.449 5.306-2.923 0-5.304-2.347-5.304-5.234 0-2.924 2.418-5.27 5.376-5.27 2.96 0 5.377 2.31 5.377 5.198zm4.077-5.126h2.31V6.519h-6.423v2.563c-1.48-1.986-3.248-2.852-5.701-2.852-5.016 0-9.166 4.26-9.166 9.385 0 5.053 4.078 9.168 9.021 9.168 2.526 0 4.33-.794 5.846-2.67v2.382h6.423v-3.827h-2.31V10.345zm10.392-3.826h-6.026v3.826h2.31v10.323h-2.31v3.827h8.768v-3.827H94.67v-5.847c0-2.78 1.48-4.548 3.788-4.548 2.418 0 3.537 1.444 3.573 4.62v5.775h-2.31v3.827h8.733v-3.827h-2.382v-6.064c0-2.67 1.516-4.331 3.933-4.331 2.346 0 3.572 1.48 3.572 4.331v6.064h-2.309v3.827H120v-3.827h-2.309v-7.074c0-1.914-.253-3.032-.866-4.151-1.118-1.95-3.392-3.213-5.773-3.213-2.671 0-4.799 1.336-5.99 3.79-1.263-2.527-3.139-3.79-5.593-3.79-2.165 0-3.897 1.047-5.196 3.104V6.52z"></path>
  </svg>
`;
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
    span({ class: 'icon icon-dam-Menu w-8 h-8 fill-current [&_svg>use]:stroke-danaherpurple-500 [&_svg>use]:hover:stroke-danaherpurple-800' }),
  );
  const spanInnerHtml = hamburgerIcon.querySelector('button > span');
  spanInnerHtml.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#273F3F" fill-rule="evenodd" d="M3 7c-.552 0-1-.448-1-1s.448-1 1-1h18c.552 0 1 .448 1 1s-.448 1-1 1H3zm0 6c-.552 0-1-.448-1-1s.448-1 1-1h18c.552 0 1 .448 1 1s-.448 1-1 1H3zm-1 5c0 .552.448 1 1 1h18c.552 0 1-.448 1-1s-.448-1-1-1H3c-.552 0-1 .448-1 1z" clip-rule="evenodd"></path></svg>
  `;

  searchNewBlock.append(hamburgerIcon);
  searchNewBlock.append(logoPictureBlock);
  //extendedSectionBlock.append(searchHtmlBlockInner);
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
  console.log(menuLinks);
  const navHtmlBlock = div({ class: 'mega-menu-off-scroll hidden lg:flex items-center gap-x-4' });

  // home link
  //const homeLink = a({ class: 'hidden lg:flex text-danaherpurple-500 hover:text-danaherpurple-800 lifesciences-logo-link font-semibold', href: '/' }, 'Life Sciences');

  // main nav
  //navHtmlBlock.append(homeLink);
  menuLinks.forEach((item) => {
    console.log(item);
    const menuItemName = item.innerText;
    const expandIcon = item.querySelector('span.icon-arrow-right');
    const menuItemEl = a(
      {
        class: 'btn relative bg-black hover:bg-black text-white font-medium ring-0 border-0 ring-offset-0 group',
        href: item.querySelector('a')?.href || '#',
      },
      menuItemName,
    );
    if (expandIcon) {
      menuItemEl.append(span({ class: 'icon icon-chevron-down [&_svg>use]:stroke-danaherpurple-500 transition group-hover:rotate-180 ml-1' }));
      menuItemEl.addEventListener('click', (e) => {
        e.preventDefault();
        showFlyoutMenu();
        sortFlyoutMenus(`Menu|${menuItemName}`);
      });
    }
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
  console.log(resp);

  if (resp.ok) {
    const html = await resp.text();
    console.log(html);

    // build header DOM
    const headerBlock = div({ class: 'nav-container pt-0 pb-0 md:p-0 bg-black relative z-20' });
    headerBlock.innerHTML = html;
    console.log(headerBlock.innerHTML);
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

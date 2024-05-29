import { decorateIcons } from '../../scripts/aem.js';
import {
  a, div, h1, input, p, span, ul,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const pictureTag = block.querySelector('picture');
  const parentWrapper = div({ class: 'absolute w-full inset-x-auto inset-y-0 flex flex-col items-center justify-center gap-y-4 text-5xl' });
  const headingTag = block.querySelector('h1');
  headingTag.classList.add(...'font-semibold text-white hidden lg:block'.split(' '));
  parentWrapper.append(headingTag);
  block.classList.add('relative');
  block.innerHTML = '';
  if (block.classList.contains('input-popup')) {
    const searchBackdropContainer = div(
      { id: 'search-container', class: 'w-screen h-screen fixed top-0 left-0 bg-white opacity-100 z-50 transition-all -translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden' },
      div(
        {
          id: 'search-product',
          class: 'container mx-auto sm:pt-7',
        },
        div(
          { class: 'flex justify-between items-center mb-0 md:mb-4 px-4 md:px-0' },
          h1({ class: 'text-2xl md:text-5xl font-normal tracking-wide text-black mb-3' }, 'Search'),
          p({ class: 'hidden md:block w-96 ml-28' }, 'Search by keyword phrase, products, or applications across the Life Science Companies of Danaher'),
          p(
            { class: 'flex items-center' },
            'Close',
            span({ id: 'close-search-container', class: 'icon icon-close w-12 h-12 text-black/70 fill-current p-3 mx-auto cursor-pointer' }),
          ),
        ),
        div(
          { class: 'relative' },
          div(
            { class: 'flex flex-col md:flex-row gap-x-2 gap-y-4 px-4 md:px-0' },
            div(
              { class: 'w-full relative sm:border border-b sm:border-solid rounded flex flex-wrap gap-1 py-2 pl-8 pr-0 md:px-14 bg-[#F5EFFF]' },
              span({
                class: 'icon icon-search bg-transparent text-black absolute ms-2 md:ms-1 p-1 md:p-0 inset-y-0 start-0 w-6 my-auto md:w-10 [&_svg]:fill-current cursor-pointer',
              }),
              input({
                class: 'w-auto relative py-1 pl-2 md:pl-0 flex flex-grow text-gray-400 font-medium bg-transparent tracking-wider text-lg sm:text-xl placeholder-grey-300 outline-none',
                id: 'search-input',
                placeholder: 'Search here...',
                type: 'text',
                autocomplete: 'off',
              }),
              span({ class: 'icon icon-close hidden md:block absolute me-2 md:me-1 inset-y-0 right-0 w-6 my-auto md:w-10 text-black fill-current cursor-pointer', id: 'empty-searchbar' }),
            ),
            a({ href: '#', class: 'btn btn-primary-purple flex h-max my-auto px-5 py-3 rounded-full font-bold' }, 'View Results'),
          ),
          div(
            { class: 'absolute bg-black text-white z-10' },
            ul({ id: 'search-suggestions', class: 'min-w-80 max-w-xl flex flex-col gap-y-2 px-4 py-2 empty:hidden' }),
          ),
        ),
      ),
      div({ id: 'search-content', class: 'container h-4/6 md:h-3/5 overflow-y-scroll mt-4 mx-auto mb-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-x-12 gap-y-3' }),
      div(
        { class: 'w-full fixed bottom-0 text-black font-normal hidden' },
        div(
          { class: 'grid grid-cols-5' },
          div(
            { class: 'hidden md:col-span-2 lg:col-span-3 md:flex flex-col bg-danaherpurple-50 px-8 py-3 text-danaherpurple-800 text-sm place-content-center' },
            'Spotlight',
            a(
              { class: 'flex items-center text-base text-black' },
              'Discover the all new CellXpress.ai Automated Cell Culture System',
              span({ class: 'icon icon-arrow-right flex items-center [&_svg]:w-4 [&_svg]:h-4 [&_svg]:stroke-1 [&_svg]:text-danaherpurple-500 ml-2' }),
            ),
          ),
          div(
            { class: 'col-span-5 md:col-span-3 lg:col-span-2 bg-danaherpurple-500 px-8 py-3 text-white flex justify-between' },
            div(
              { class: 'flex flex-col place-content-center [&_p]:leading-4' },
              p({ class: 'text-2xl md:text-3xl' }, 'Total results'),
              a(
                {
                  href: '#',
                  class: 'flex items-center text-base font-bold mt-2',
                },
                'Visit Results',
                span({ class: 'icon icon-arrow-right flex items-center [&_svg]:w-4 [&_svg]:h-4 [&_svg]:fill-white ml-2' }),
              ),
            ),
            p({ id: 'total-result-count', class: 'text-5xl md:text-7xl lg:text-8xl' }, '0'),
          ),
        ),
      ),
    );
    const searchBar = div(
      {
        class: 'max-w-2xl w-full relative sm:border border-b sm:border-solid rounded-full flex flex-wrap gap-1 py-2 pl-8 pr-0 md:px-14 bg-white',
        id: 'search-by-coveo',
      },
      span({
        class: 'icon icon-search bg-transparent text-black absolute flex ms-2 ms-4 p-1 md:p-0 inset-y-0 start-0 w-6 h-6 my-auto [&_svg]:fill-current cursor-pointer',
      }),
      input({
        class: 'w-auto relative py-1 pl-2 md:pl-0 flex flex-grow text-gray-400 font-medium bg-transparent tracking-wider text-lg sm:text-xl placeholder-grey-300 outline-none',
        id: 'search-input',
        placeholder: 'What can we help you find today?',
        type: 'text',
        autocomplete: 'off',
      }),
    );
    parentWrapper.append(searchBar);
    parentWrapper.append(searchBackdropContainer);
    decorateIcons(parentWrapper);
  }
  block.append(pictureTag);
  // block.innerHTML = parentWrapper;
  block.append(parentWrapper);
}

import { decorateIcons } from '../../scripts/aem.js';
import { div, h5, input, span } from '../../scripts/dom-builder.js';

function filterFacets() {
  return div('Facets');
}

export default function decorate(block) {
  const heading = div(
    { class: 'flex items-center justify-between bg-white px-8 py-6 shadow-lg' },
    h5({ class: 'inline-flex items-center text-2xl text-gray-500' }, 'Publications'),
    span({ class: 'icon icon-close w-6 h-6 invert cursor-pointer' }),
  );
  const searchBar = div(
    { class: 'relative' },
    input({
      type: 'text',
      class: 'block w-full py-2 pl-3 pe-8 text-sm text-gray-600 tracking-wide bg-white border rounded-full',
      placeholder: 'Search by topic, author or PubMed ID',
    }),
    span({ class: 'icon icon-search w-5 h-5 cursor-pointer absolute end-2.5 bottom-2.5' }),
  );
  const drawer = div(
    {
      id: 'drawer-right-example',
      class: 'fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform bg-gray-100 w-[35rem] transform-none',
    },
    heading,
    div(
      { class: 'px-8 py-6' },
      searchBar,
      div(
        { class: 'mt-6 py-4 border-t' },
        'Filter by',
        filterFacets()
      ),
      div(
        { class: 'pt-6' },
        'filter facets',
      )
    )
  );
  block.classList.add(...'w-3/4 m-auto mt-4 mb-12 font-sans text-base flex flex-col justify-center'.split(' '));
  const backdrop = div({ class: 'bg-gray-900/50 fixed inset-0 z-30' });
  decorateIcons(drawer);
  block.appendChild(drawer);
  block.appendChild(backdrop);
}

import { buildBlock, decorateIcons } from './aem.js';
import { div, h5, input, span } from './dom-builder.js';

export async function showDrawer(id='drawer-eg') {
  document.querySelector(`#${id}`)?.parentElement.classList.remove('hidden');
}

export async function hideDrawer(id='drawer-eg') {
  document.querySelector(`#${id}`)?.parentElement.classList.add('hidden');
}

export async function decorateDrawer(config) {
  const specificId = config && config.id ? config.id : 'drawer-eg';
  const drawerTitle = config && config.title ? config.title : 'Title';
  const heading = div(
    { class: 'drawer-header flex items-center justify-between bg-white px-8 py-6 shadow-lg' },
    h5({ class: 'inline-flex items-center text-2xl text-gray-500' }, drawerTitle),
    span({ class: 'icon icon-close w-6 h-6 invert cursor-pointer', onclick: () => hideDrawer() }),
  );
  const drawer = div(
    {
      id: specificId,
      class: `fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform bg-gray-100 w-[35rem] transform-none`,
    },
    heading,
    div(
      { class: 'drawer-body px-8 py-6' },
      
    )
  );
  const block = buildBlock('drawer', '');
  document.querySelector('main').append(block);
  block.innerHTML = '';
  block.classList.add('hidden');
  block.append(drawer);
  if (config && config.isBackdrop) block.appendChild(div({ class: 'bg-gray-900/50 fixed inset-0 z-30' }));
  return block;
}

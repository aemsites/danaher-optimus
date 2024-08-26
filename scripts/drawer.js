import { buildBlock } from './aem.js';
import { div, h5, span } from './dom-builder.js';

export async function showDrawer(id = 'drawer-eg') {
  document.querySelector(`#${id}`)?.parentElement.classList.remove('hidden');
}

export async function hideDrawer(id = 'drawer-eg') {
  document.querySelector(`#${id}`)?.parentElement.classList.add('hidden');
}

export async function decorateDrawer(config) {
  const specificId = config && config.id ? config.id : 'drawer-eg';
  const drawerTitle = config && config.title ? config.title : 'Title';
  const heading = specificId !== 'drawer-highlights' ? div(
    { class: 'drawer-header flex items-center justify-between bg-white px-8 py-6 shadow-lg' },
    h5({ class: 'inline-flex items-center text-2xl text-gray-500' }, drawerTitle),
    span({ class: 'icon icon-close w-6 h-6 invert cursor-pointer', onclick: () => hideDrawer(config.id) }),
  ) : span({ class: 'icon icon-close w-6 h-6 invert cursor-pointer float-right mt-4 mr-5', onclick: () => hideDrawer(config.id) });
  const drawer = div(
    {
      id: specificId,
      class: `fixed top-0 right-0 z-40 h-screen transition-transform w-[35rem] transform-none ${specificId === 'drawer-highlights' ? 'bg-white max-[666px]:w-auto' : 'bg-gray-100'}`,
    },
    heading,
    div({ class: 'drawer-body h-full px-8 py-6 shadow-lg' }),
  );
  const block = buildBlock('drawer', ' ');
  block.innerHTML = ' ';
  block.classList.add('hidden');
  block.append(drawer);
  const backdrop = div({ class: `${config && config.isBackdrop ? 'bg-gray-900/50' : ''} fixed inset-0 z-30`, onclick: () => hideDrawer(config.id) });
  block.appendChild(backdrop);

  return block;
}

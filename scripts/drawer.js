import { buildBlock } from './aem.js';
import { div, h5, span } from './dom-builder.js';

export async function showDrawer(id = 'drawer-eg') {
  document.querySelector(`#${id}`)?.classList.remove('hidden');
}

export async function hideDrawer(id = 'drawer-eg') {
  document.querySelector(`#${id}`)?.classList.add('hidden');
}

export async function decorateDrawer(config) {
  const {
    id: specificId = 'drawer-eg', title: drawerTitle = 'Title',
    closeBackdrop = true, isBackdrop = true, isSolidBackdrop = true,
    existedEl, isDrawer = true,
  } = config;
  const heading = specificId !== 'drawer-highlights' ? div(
    { class: 'drawer-header flex items-center justify-between bg-white px-8 py-6 shadow-lg' },
    h5({ class: 'inline-flex items-center text-2xl text-gray-500' }, drawerTitle),
    span({ class: 'icon icon-close size-6 invert cursor-pointer', onclick: () => hideDrawer(specificId) }),
  ) : span({ class: 'icon icon-close w-6 h-6 mt-4 mr-5 invert cursor-pointer absolute right-0 top-0', onclick: () => hideDrawer(config.id) });
  const drawerBody = div({ class: 'drawer-body flex-auto overflow-scroll px-8 py-6' });
  const drawerFooter = div({ class: 'drawer-footer p-4' });
  const drawer = isDrawer ? div(
    { class: `fixed top-0 right-0 z-40 h-screen transition-transform bg-gray-100 w-[35rem] transform-none ${specificId === 'drawer-highlights' ? 'bg-white max-[666px]:w-auto' : 'bg-gray-100'}` },
    div(
      { class: 'h-full relative flex flex-col break-words' },
      heading,
      drawerBody,
      drawerFooter,
    ),
  ) : '';
  const block = existedEl || buildBlock('drawer', '');
  if (!existedEl) block.innerHTML = '';
  const isSolidBackdropClass = isSolidBackdrop ? 'bg-black' : '';
  const backdrop = div({ class: `${isBackdrop ? 'bg-gray-900/50' : isSolidBackdropClass} fixed inset-0 z-30` });
  if (closeBackdrop) backdrop.addEventListener('click', () => hideDrawer(specificId));
  const section = div({ id: specificId, class: 'relative hidden' }, drawer, backdrop);
  block.append(section);
  return {
    block, section, backdrop, drawer, drawerBody, drawerFooter,
  };
}

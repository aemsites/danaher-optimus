import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section = main.querySelector('div');
  const headerSection = div({ class: 'border border-b-slate-400 mb-10' });
  const titleBlock = buildBlock('title-card', { elems: [] });
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock, titleBlock);
  main.insertBefore(headerSection, section);
}

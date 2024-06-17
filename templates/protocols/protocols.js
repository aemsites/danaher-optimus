import { buildBlock } from "../../scripts/aem.js";

export default async function buildAutoBlocks() {
  const container = document.querySelector('main div');
  container.classList.add(...'border border-b-slate-400 mb-10'.split(' '));
  const titleBlock = buildBlock('title-card', { elems: []});
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: []});

  container.append(
    breadcrumbBlock, titleBlock,
  )
}

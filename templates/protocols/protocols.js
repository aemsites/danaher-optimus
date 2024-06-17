import { buildBlock } from "../../scripts/aem.js";

export default async function buildAutoBlocks() {
  const container = document.querySelector('main div');

  const titleBlock = buildBlock('title-card', { elems: []});
  titleBlock.classList.add('block');
  titleBlock.dataset.blockName = 'title-card';

  container.append(
    titleBlock,
  )
}

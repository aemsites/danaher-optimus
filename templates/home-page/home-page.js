import { div } from '../../scripts/dom-builder.js';

export default function buildAutoBlocks(block) {
  const contentBlocks = block.querySelectorAll('.section');
  // Creating the default template wrapper
  const defaultTemplate = div({ id: 'content-wrapper' });
  // Creating content wrapper
  const content = div({ id: 'content' });

  // Creating outer element
  const outerElement = div({ class: 'outer' });

  // Creating main elements
  const main = div({ id: 'main' });

  // Iterate over each section
  contentBlocks.forEach((blocks) => {
    // Appending Hero banner from each section
    const heroBanner = blocks.querySelector('.hero-wrapper');

    if (heroBanner) {
      heroBanner.className = 'w-full m-autoflex px-8 py-3 bg-main bg-grey-30 min-h-[496px]';
      defaultTemplate.appendChild(heroBanner); // Clone to avoid removing the original
      const h1Element = heroBanner.querySelector('h1');
      if (h1Element) {
        h1Element.closest('div').className = 'relative';
        h1Element.className = 'absolute w-full inset-x-auto inset-y-0 flex items-center justify-center text-5xl font-semibold text-white';
        heroBanner.appendChild(h1Element);
      }
    }

    main.appendChild(blocks);
    blocks.style.display = null;
  });

  // Creating clearfix element
  const clearFix = div({ class: 'clearfix' });

  outerElement.appendChild(main);
  content.appendChild(outerElement);
  content.appendChild(clearFix);
  defaultTemplate.appendChild(content);
  block.appendChild(defaultTemplate);
}

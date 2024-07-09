import {
  div, h1, span, hr, p,
} from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  const main = document.querySelector('main');
  main.querySelectorAll('div.section[data-tabname="Overview"], div.section[data-tabname="Datasheet"]').forEach((section) => {
    section.classList.add('hide-section');
  });
  const skuId = response?.at(0)?.raw?.sysuri;
  const sku = skuId?.split('/')?.pop()?.split('-')?.pop();
  const title = response?.at(0)?.raw?.systitle;
  const productTags = response?.at(0)?.raw?.producttags;
  const productTagsDiv = div({ class: 'flex flex-wrap pb-4 gap-2' });
  productTags?.forEach((item) => {
    const button = document.createElement('button');
    button.classList.add(...'appearance-none px-2 py-1 rounded-e text-xs font-semibold tracking-wider break-keep bg-[rgb(237,246,247)] text-[rgb(44,101,107)] border-[rgb(44,101,107)] border'.split(' '));
    button.appendChild(span({ class: 'pt-0' }, item));
    productTagsDiv.appendChild(button);
  });
  const mainDiv = div(
    { class: 'text-4xl font-semibold pb-4' },
    p({ class: 'text-2xl font-semibold text-[#2a3c3c]' }, sku),
    hr({ class: 'h-[1px] my-6 bg-interactive-grey-active mt-0 mb-10' }),
    h1({ class: 'mt-6 mb-0 text-4xl font-semibold' }, title),
    productTagsDiv,
  );
  block.appendChild(mainDiv);
}

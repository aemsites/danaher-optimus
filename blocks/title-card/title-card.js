import { getMetadata } from "../../scripts/aem.js";
import { div, h1 } from "../../scripts/dom-builder.js";

export default function decorate(block) {
  const title = getMetadata('og:title');
  const description = getMetadata('og:description');

  const headTitle = div(
      h1({ class: 'my-5 text-black-0 text-6xl font-semibold tracking-normal' }, title),
      div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }),
      div({ class: 'text-xl tracking-normal' }, description),
    );
  block.append(headTitle);
}
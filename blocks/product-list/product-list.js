import { getProductsListResponse } from '../../scripts/search.js';
import {
  a, div, h2, h3, p, span,
} from '../../scripts/dom-builder.js';

function addProductTags(productTagsArray) {
  if (productTagsArray !== null && productTagsArray.length > 0) {
    const productTagsDiv = div({ class: 'flex flex-wrap pb-4 gap-2' });
    productTagsArray?.forEach((item) => {
      const productTagsButton = document.createElement('button');
      productTagsButton.classList.add(...'appearance-none px-2 py-1 rounded-e text-xs font-semibold tracking-wider break-keep bg-[rgb(237,246,247)] text-[rgb(44,101,107)] border-[rgb(44,101,107)] border'.split(' '));
      productTagsButton.appendChild(span({ class: 'pt-0' }, item));
      productTagsDiv.appendChild(productTagsButton);
    });
    return productTagsDiv;
  }
}
export default async function decorate(block) {
  const { origin } = window.location;
  const parentContainer = div(
    { class: 'products-parent-container flex flex-col' },
    h2({ class: 'mb-6 font-bold' }, 'Products'),
    h3({ class: 'mb-3 font-semibold' }, 'Product'),
  );

  const productsListResponse = await getProductsListResponse();
  if (productsListResponse !== null) {
    const productListJsonArray = JSON.parse(productsListResponse);
    if (productListJsonArray.length > 0) {
      productListJsonArray.forEach((product) => {
        const productContainer = div(
          { class: 'product-container pb-4 mb-4 border-b border-gray flex flex-col' },
          p({ class: 'font-bold text-gray-400 text-body-small' }, product.raw?.productslug.split('-').slice(-1)),
          p(
            { class: 'font-bold' },
            a({ class: 'product-link', href: origin.concat('/products/detail/') + product.raw?.productslug }, product.raw?.title),
          ),
        );
        if (product.raw?.producttags) {
          productContainer.append(addProductTags(product.raw.producttags));
        }
        parentContainer.append(productContainer);
        // console.log("Product Title :: "+product.raw?.title);
        // console.log("Product Code :: " + product.raw?.productslug.split('-').slice(-1));
        // let productTags = product.raw.producttags ?  product.raw.producttags : "No Product Tags";
        // console.log("Product Tags :: " + productTags);
      });
      block.append(parentContainer);
    }
  }
}

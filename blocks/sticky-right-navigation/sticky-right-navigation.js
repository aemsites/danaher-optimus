import { a, h3, li } from "../../scripts/dom-builder.js";

export default function decorate(block) {
  const rightNavLinks = document.querySelectorAll('h2');
  const navLinksUl = document.createElement('ul');
  navLinksUl.classList.add(...'sticky mt-0 max-[768px]:hidden'.split(' '));
  rightNavLinks.forEach((rightNavLink) => {
    const liElement = li({class: 'w-72 rounded-3xl mb-2 pr-3.5 pl-3.5 py-2.5 hover:bg-[#f2f2f2]'});
    //liElement.classList.add(...'w-72 rounded-3xl mb-2 pr-3.5 pl-3.5 py-2.5 hover:bg-[#f2f2f2]'.split(' '));

    const anchorElement = a({class: 'text-base text-black font-bold'});

    anchorElement.textContent = rightNavLink.textContent;
    anchorElement.href = `#${rightNavLink.id}`;

    liElement.appendChild(anchorElement);
    navLinksUl.appendChild(liElement);
  });
  block.appendChild(navLinksUl);
  
}

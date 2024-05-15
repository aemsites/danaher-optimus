export default function decorate(block) {
  const rightNavLinks = document.querySelectorAll('h2');
  const navLinksUl = document.createElement('ul');
  navLinksUl.classList.add('sticky-ul');
  rightNavLinks.forEach((rightNavLink) => {
    const liElement = document.createElement('li');
    const anchorElement = document.createElement('a');

    anchorElement.textContent = rightNavLink.textContent;
    anchorElement.href = `#${rightNavLink.id}`;

    liElement.appendChild(anchorElement);
    navLinksUl.appendChild(liElement);
  });
  
  block.appendChild(navLinksUl);
}


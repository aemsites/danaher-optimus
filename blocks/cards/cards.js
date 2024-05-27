export default function decorate(block) {
  const parentDiv = document.createElement('div');
  const ul = document.createElement('ul');
  ul.classList.add(...'cards-ul grid grid-cols-3 gap-11 max-[799px]:grid-cols-1'.split(' '));

  [...block.children].forEach((row) => {
    const pictureTag = row.querySelector('picture');
    const cardHeading = row.querySelector('h2');
    cardHeading.classList.add(...'card-heading text-2xl tracking-[-0.03em]'.split(' '));

    const cardDescription = row.querySelector('p');
    if (cardDescription) {
      cardDescription.classList.add(...'card-description h-full mt-2.5 mb-3 text-base tracking-wide'.split(' '));
    }

    const cardLink = row.querySelector('a');
    if (cardLink) {
      cardLink.classList.add(...'card-link w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]'.split(' '));
    }

    if (!pictureTag) {
      cardHeading.classList.add(...'text-5xl mb-8 mt-[72px]'.split(' '));
      parentDiv.appendChild(cardHeading);
    } else {
      const li = document.createElement('li');
      li.classList.add(...'cards-li flex flex-col bg-[#e5e7eb]'.split(' '));

      const cardContentDiv = document.createElement('div');
      cardContentDiv.classList.add(...'cards-card-body py-9 px-8 flex flex-col grow'.split(' '));

      cardContentDiv.appendChild(cardHeading);
      cardContentDiv.appendChild(cardDescription);
      cardContentDiv.appendChild(cardLink);

      li.appendChild(pictureTag);
      li.appendChild(cardContentDiv);
      ul.appendChild(li);
    }
  });
  parentDiv.appendChild(ul);
  block.appendChild(parentDiv);
}

import { getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ul, li, a,
} from '../../scripts/dom-builder.js';
// breadcrumb functionality implementation
export default function decorate(block) {
  const path = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');
  const navigation = getMetadata('navigation');
  if (navigation !== 'false' || navigation === null) {
    const { length } = path;
    const breadcrumbLiLinks = li();
    let url = '';
    let breadcrumbLinks = '';
    for (let i = 0; i < length; i += 1) {
      url = `${url}/${path[i]}`;
      let link = i === length - 1 ? title : path[i].charAt(0).toUpperCase() + path[i].slice(1);
      link = link.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
      if (i !== 0) link = ` / ${link}`;
      breadcrumbLinks = a({ class: 'breadcrumb underline inline-flex h-10 w-max items-center justify-center rounded-md bg-background py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50', href: url }, (`${link}`));
      breadcrumbLiLinks.appendChild(breadcrumbLinks);
    }
    const breadcrumNav = nav(
      { class: 'breadcrumb-wrapper relative z-10 flex max-w-max flex-1 items-center' },
      div({ style: 'position:relative' }, ul(breadcrumbLiLinks)),
    );
    block.appendChild(breadcrumNav);
  }
}

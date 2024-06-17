import { getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ul, li, a,
} from '../../scripts/dom-builder.js';
// breadcrumb functionality implementation
export default function decorate() {
  const path = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');
  const { length } = path;
  const breadcrumbLiLinks = li();
  let url = '';
  let breadcrumbLinks = '';
  for (let i = 0; i < length; i += 1) {
    let underline = 'underline';
    url = `${url}/${path[i]}`;
    let link = i === length - 1 ? title : path[i].charAt(0).toUpperCase() + path[i].slice(1);
    link = link.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
    if (i !== 0) link = ` / ${link}`;
    if (i !== length - 1) underline = `hover:${underline}`;
    breadcrumbLinks = a({ class: `'breadcrumb ${underline} leading-5 text-lg'`, href: url }, (`${link}`));
    breadcrumbLiLinks.appendChild(breadcrumbLinks);
  }
  const breadcrumNav = nav(
    { class: 'breadcrumb-wrapper relative z-10' },
    div({ style: 'position:relative' }, ul(breadcrumbLiLinks)),
  );

  return breadcrumNav;
}

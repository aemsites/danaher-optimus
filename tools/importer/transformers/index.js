import header from './header.js';
import footer from './footer.js';
import accordion from './accordion.js';
import metadata from './metadata.js';
import postProcessSVGIcons from './postProcessSVGIcons.js';

// eslint-disable-next-line import/prefer-default-export
export const transformers = [
  accordion,
];

export const asyncTransformers = [

];

export const xfTransformers = [
  footer,
];

export const xfAsyncTransformers = [
  header,
];

export const preTransformers = [

];

export const postTransformers = [
  postProcessSVGIcons,
  metadata,
];

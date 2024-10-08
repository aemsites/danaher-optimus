export const searchFacetTerms = {
  categorytype: 'Category Type',
  hostspecies: 'Host Species',
  sampletype: 'Sample Type',
  reactivespecies: 'Reactive Species',
  target: 'Target',
  conjugations: 'Conjugations',
  reactivityapplications: 'Reactivity Applications',
};

export const suggestions = {
  count: 8,
  q: '',
  locale: 'en',
  timezone: 'America/New_York',
  pipeline: 'Abcam Product Listing',
  searchHub: 'AbcamProductListing',
  visitorId: 'd8c6a2a1-84e4-4d6f-b262-b91ad50a4c44',
};

const common = {
  locale: 'en',
  debug: false,
  tab: 'default',
  numberOfResults: 10,
  enableDidYouMean: true,
  enableQuerySyntax: false,
  sortCriteria: 'relevancy',
  timezone: 'America/New_York',
  visitorId: '147f954b-ddc1-4834-8f71-0de880f7283f',
  referrer: 'https://stage.lifesciences.danaher.com',
  q: '',
  actionsHistory: [
    {
      name: 'Query',
      time: '\'2024-03-04T22:26:29.769Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T22:25:42.258Z\'',
      value: 'men',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T22:25:35.892Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T22:25:02.692Z\'',
      value: 'sand',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T22:24:46.716Z\'',
    },
  ],
  fieldsToInclude: [
    'author',
    'language',
    'urihash',
    'objecttype',
    'collection',
    'source',
    'permanentid',
    'date',
    'filetype',
    'parents',
    'ec_price',
    'ec_name',
    'ec_description',
    'ec_brand',
    'ec_category',
    'ec_item_group_id',
    'ec_shortdesc',
    'ec_thumbnails',
    'ec_images',
    'ec_promo_price',
    'ec_in_stock',
    'ec_rating',
    'cat_rating_count',
    'brand',
    'images',
    'sku',
    'title',
    'description',
    'richdescription',
    'opco',
    'contenttype',
    'documenttype',
    'pagetype',
    'shortspecifications',
    'specificationsjson',
    'bundlepreviewjson',
  ],
  analytics: {
    clientId: '147f954b-ddc1-4834-8f71-0de880f7283f',
    clientTimestamp: '2024-03-04T22:28:18.381Z',
    documentReferrer: 'default',
    originContext: 'Search',
    documentLocation: 'https://atomicv2-mcgfqb.stackblitz.io/examples/fashion.html',
    capture: false,
  },
  context: {
    host: 'stage.lifesciences.danaher.com',
    internal: false,
  },
  facetOptions: {
    freezeFacetOrder: true,
  },
};

export const facets = [
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 8,
    sortCriteria: 'automatic',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'hostspecies',
    field: 'hostspecies',
  },
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 8,
    sortCriteria: 'automatic',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'sampletype',
    field: 'sampletype',
  },
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 8,
    sortCriteria: 'automatic',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'reactivespecies',
    field: 'reactivespecies',
  },
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 10,
    sortCriteria: 'occurrences',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'categorytype',
    field: 'categorytype',
  },
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 8,
    sortCriteria: 'automatic',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'target',
    field: 'target',
  },
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 8,
    sortCriteria: 'automatic',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'conjugations',
    field: 'conjugations',
  },
  {
    filterFacetCount: true,
    injectionDepth: 1000,
    numberOfValues: 8,
    sortCriteria: 'automatic',
    resultsMustMatch: 'atLeastOneValue',
    type: 'specific',
    currentValues: [],
    freezeCurrentValues: false,
    isFieldExpanded: false,
    preventAutoSelect: false,
    facetId: 'reactivityapplications',
    field: 'reactivityapplications',
  },
];

export const facetSelect = {
  pipeline: 'Abcam Product Listing',
  searchHub: 'AbcamProductListing',
  ...common,
  facets: [...facets],
};

export const finishType = {
  pipeline: 'Abcam Product Listing',
  searchHub: 'AbcamProductListing',
  ...common,
  facets: [...facets],
};

export const quickSearch = {
  locale: 'en',
  timezone: 'America/New_York',
  searchHub: 'default',
  visitorId: '48e4da72-35f0-43ec-9c61-a6aed682e6c3',
  debug: false,
  tab: 'default',
  referrer: 'default',
  actionsHistory: [
    {
      name: 'Query',
      time: '\'2024-03-04T22:19:01.829Z\'',
      value: 'this is beacon testing',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T22:17:18.017Z\'',
      value: 'promega corporation',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T22:17:10.215Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T20:02:41.386Z\'',
      value: 'bank',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T20:02:32.491Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T18:21:47.520Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T18:20:23.534Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T16:53:48.016Z\'',
      value: 'bank',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T16:52:20.699Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-03-04T16:47:47.427Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-02-21T14:10:02.721Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-02-20T18:58:45.364Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-02-20T18:45:48.757Z\'',
    },
    {
      name: 'Query',
      time: '\'2024-02-20T18:43:58.682Z\'',
    },
    {
      name: 'Query',
      time: '\'2023-12-07T19:35:58.897Z\'',
    },
    {
      name: 'Query',
      time: '\'2023-12-07T19:34:42.960Z\'',
    },
    {
      name: 'Query',
      time: '\'2023-12-07T19:34:33.361Z\'',
      value: 'covid',
    },
    {
      name: 'Query',
      time: '\'2023-12-07T19:33:31.851Z\'',
    },
    {
      name: 'Query',
      time: '\'2023-12-07T19:33:28.699Z\'',
      value: 'bank',
    },
    {
      name: 'Query',
      time: '\'2023-12-07T19:33:26.959Z\'',
      value: 'the bank',
    },
  ],
  fieldsToInclude: [
    'author',
    'language',
    'urihash',
    'objecttype',
    'collection',
    'source',
    'permanentid',
    'date',
    'filetype',
    'parents',
    'ec_price',
    'ec_name',
    'ec_description',
    'ec_brand',
    'ec_category',
    'ec_item_group_id',
    'ec_shortdesc',
    'ec_thumbnails',
    'ec_images',
    'ec_promo_price',
    'ec_in_stock',
    'ec_rating',
    'snrating',
    'sncost',
  ],
  q: '',
  enableQuerySyntax: false,
  sortCriteria: 'relevancy',
  queryCorrection: {
    enabled: false,
    options: {
      automaticallyCorrect: 'whenNoResults',
    },
  },
  enableDidYouMean: true,
  facets: [
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 6,
      sortCriteria: 'occurrences',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [
        {
          value: 'Image',
          state: 'idle',
        },
        {
          value: 'lithiummessage',
          state: 'idle',
        },
        {
          value: 'lithiumthread',
          state: 'idle',
        },
        {
          value: 'pdf',
          state: 'idle',
        },
      ],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'filetype',
      field: 'filetype',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'automatic',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [
        {
          value: 'Coveo Sample - Lithium Community',
          state: 'idle',
        },
      ],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'source',
      field: 'source',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'automatic',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [
        {
          value: '2021',
          state: 'idle',
        },
        {
          value: '2022',
          state: 'idle',
        },
        {
          value: '2023',
          state: 'idle',
        },
      ],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'year',
      field: 'year',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 7,
      sortCriteria: 'descending',
      rangeAlgorithm: 'even',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [
        {
          start: '2024/03/04@17:19:01',
          end: '2034/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
        {
          start: '2024/03/04@16:19:01',
          end: '2024/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
        {
          start: '2024/03/03@17:19:01',
          end: '2024/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
        {
          start: '2024/02/26@17:19:01',
          end: '2024/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
        {
          start: '2024/02/04@17:19:01',
          end: '2024/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
        {
          start: '2023/12/04@17:19:01',
          end: '2024/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
        {
          start: '2023/03/04@17:19:01',
          end: '2024/03/04@17:19:01',
          endInclusive: false,
          state: 'idle',
        },
      ],
      preventAutoSelect: false,
      type: 'dateRange',
      facetId: 'date',
      field: 'date',
      generateAutomaticRanges: false,
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 1,
      sortCriteria: 'ascending',
      rangeAlgorithm: 'even',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [],
      preventAutoSelect: false,
      type: 'dateRange',
      facetId: 'date_input_range',
      generateAutomaticRanges: true,
      field: 'date',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 0,
      sortCriteria: 'ascending',
      rangeAlgorithm: 'even',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [],
      preventAutoSelect: false,
      type: 'dateRange',
      facetId: 'date_input',
      field: 'date',
      generateAutomaticRanges: false,
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 6,
      sortCriteria: 'automatic',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'inat_kingdom',
      field: 'inat_kingdom',
      hasBreadcrumbs: false,
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'automatic',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [
        {
          value: 'mardueng',
          state: 'idle',
        },
      ],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'author',
      field: 'author',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'automatic',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'inat_family',
      field: 'inat_family',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'automatic',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      currentValues: [],
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      facetId: 'inat_class',
      field: 'inat_class',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'ascending',
      rangeAlgorithm: 'equiprobable',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [],
      preventAutoSelect: false,
      type: 'numericalRange',
      facetId: 'sncost',
      field: 'sncost',
      generateAutomaticRanges: true,
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 1,
      sortCriteria: 'ascending',
      rangeAlgorithm: 'equiprobable',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [],
      preventAutoSelect: false,
      type: 'numericalRange',
      generateAutomaticRanges: true,
      facetId: 'ytviewcount_input_range',
      field: 'ytviewcount',
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 0,
      sortCriteria: 'ascending',
      rangeAlgorithm: 'even',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [],
      preventAutoSelect: false,
      type: 'numericalRange',
      facetId: 'ytviewcount_input',
      field: 'ytviewcount',
      generateAutomaticRanges: false,
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 5,
      sortCriteria: 'descending',
      rangeAlgorithm: 'even',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [
        {
          start: 5,
          end: 5,
          endInclusive: true,
          state: 'idle',
        },
        {
          start: 4,
          end: 5,
          endInclusive: true,
          state: 'idle',
        },
        {
          start: 3,
          end: 5,
          endInclusive: true,
          state: 'idle',
        },
        {
          start: 2,
          end: 5,
          endInclusive: true,
          state: 'idle',
        },
        {
          start: 1,
          end: 5,
          endInclusive: true,
          state: 'idle',
        },
      ],
      preventAutoSelect: false,
      type: 'numericalRange',
      facetId: 'snrating_range',
      field: 'snrating',
      generateAutomaticRanges: false,
    },
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 5,
      sortCriteria: 'descending',
      rangeAlgorithm: 'even',
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [
        {
          start: 5,
          end: 6,
          endInclusive: false,
          state: 'idle',
        },
        {
          start: 4,
          end: 5,
          endInclusive: false,
          state: 'idle',
        },
        {
          start: 3,
          end: 4,
          endInclusive: false,
          state: 'idle',
        },
        {
          start: 2,
          end: 3,
          endInclusive: false,
          state: 'idle',
        },
        {
          start: 1,
          end: 2,
          endInclusive: false,
          state: 'idle',
        },
      ],
      preventAutoSelect: false,
      type: 'numericalRange',
      facetId: 'snrating',
      field: 'snrating',
      generateAutomaticRanges: false,
    },
    {
      delimitingCharacter: ';',
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'occurrences',
      basePath: [],
      filterByBasePath: true,
      resultsMustMatch: 'atLeastOneValue',
      currentValues: [],
      preventAutoSelect: false,
      type: 'hierarchical',
      facetId: 'geographicalhierarchy',
      field: 'geographicalhierarchy',
    },
  ],
  numberOfResults: 10,
  firstResult: 0,
  facetOptions: {
    freezeFacetOrder: false,
  },
};

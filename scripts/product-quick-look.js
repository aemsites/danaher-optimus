import { decorateIcons } from './aem.js';
import { 
  div, span, a,
} from './dom-builder.js';
import { getFullResponse, getProductResponse, } from './search.js';

function decorateOverview(quickLookDrawer, isotype, hostspecies, formulation, clonality, target, immunogenObject,imagesjson) {
  
  const overviewSection = div ({class:'product-overview tab-item'});
  let drawerContent = quickLookDrawer.querySelector('#drawer-quickLook .drawer-body');
  
  const imagesJsonObj = Object.keys(imagesjson).length !== 0 ? JSON.parse(imagesjson) : [];
  console.log(imagesJsonObj);
  const { href } = window.location;

  //Overview Bottom part
  const overviewBottomPart = div({class:'overview-Bottom-part flex flex-wrap px-8 gap-x-20 pt-4 bg-white'},
    div({class:'w-2/5'},
      div({class: 'pr-3 my-4 text-black-0 text-body-xmedium'},
        div({class: 'font-semibold'},'Isotype',
          div({class:'font-light'},isotype),
        )
      )
    ),
    div({class:'w-2/5'},
      div({class: 'pr-3 my-4 text-black-0 text-body-xmedium'},
        div({class: 'font-semibold'},'Host species',
          div({class:'font-light'},hostspecies),
        )
      )
    ),
    div({class:'w-2/5'},
      div({class: 'pr-3 my-4 text-black-0 text-body-xmedium'},
        div({class: 'font-semibold'},'Storage buffer',
          div({class:'font-light'},formulation),
        )
      )
    ),
    div({class:'w-2/5'},
      div({class: 'pr-3 my-4 text-black-0 text-body-xmedium'},
        div({class: 'font-semibold'},'Clonality',
          div({class:'font-light'},clonality),
        )
      )
    ),
    div({class:'w-full'},
      div({class: 'pr-3 my-4 text-black-0 text-body-xmedium'},
        div({class: 'font-semibold'},'Immunogen',
          div({class:'font-light'},immunogenObject),
        )
      )
    ),
  );
  const targetInfo = div({class:'flex flex-wrap px-8 pt-4 bg-white'},
    div({class: 'w-full border-t'},
      div({class: 'flex flex-col pr-3 my-4 text-black-0 text-body-xmedium'},
        div({class: 'mb-3 font-semibold'},'Target data',
          a(
            { class: 'w-fit inline-flex items-center underline text-[#378189]', href },
            target,
            span({ class: 'icon icon-share-icon ml-2' }),
          ),
        )
      )
    )
  )
  overviewSection.append(overviewBottomPart);
  overviewSection.append(targetInfo);
  if (drawerContent) drawerContent.append(overviewSection); 
}

function decoratePublications(quickLookDrawer) {
  const publicationsSection = div ({class:'product-publications tab-item hidden'}, 'Publications');
  let drawerContent = quickLookDrawer.querySelector('#drawer-quickLook .drawer-body');
  if (drawerContent) drawerContent.append(publicationsSection);
}

function decorateReviewsAndRatings(quickLookDrawer) {
  const reviewsAndRatingsSection = div ({class:'product-reviews tab-item hidden'}, 'Ratings and Reviews');
  let drawerContent = quickLookDrawer.querySelector('#drawer-quickLook .drawer-body');
  if (drawerContent) drawerContent.append(reviewsAndRatingsSection);
}

function toggleTabs(event, quickLookDrawer) {
  const contentSections = quickLookDrawer.querySelectorAll('.tab-item');
  const selectedTab = event.target.closest('.product-tab')?.classList[0];
  contentSections.forEach(element => {
    if (element.classList.contains(selectedTab)) element.classList.remove('hidden');
    else element.classList.add('hidden');
  });
  const allProductTabs = quickLookDrawer.querySelectorAll('.product-tab');
  allProductTabs.forEach(element => {
    if (element.classList.contains(selectedTab)) element.classList.add('active', 'border-b-8', 'border-[#ff7223]');
    else element.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
  })
}

function decorateTabs(quickLookDrawer) {
  const tabsContainer = div({class:'tabs-container flex flex-row'},
    div({class:'flex justify-end font-semibold md:border-none'},
      div({class:'product-overview product-tab active border-b-8 border-[#ff7223] min-h-pdpTabs first-of-type:ml-0 ml-5 mr-5 pt-1 pb-1 text-black-0 whitespace-nowrap cursor-pointer shadow-tab-active-thin'},'Overview'),
      div({class:'product-publications product-tab min-h-pdpTabs first-of-type:ml-0 ml-5 mr-5 pt-1 pb-1 text-black-0 whitespace-nowrap cursor-pointer'},'Publications'),
      div({class:'product-reviews product-tab min-h-pdpTabs first-of-type:ml-0 ml-5 mr-5 pt-1 pb-1 text-black-0 whitespace-nowrap cursor-pointer'},'Reviews')
    ),
  );
  tabsContainer.addEventListener('click', (event) => {
    toggleTabs(event, quickLookDrawer);
  });
  quickLookDrawer.querySelector('.drawer-header-container').append(tabsContainer);
}

export async function decorateProductQuickLook(quickLookDrawer, selectedProduct,slug) {
  let productCode = selectedProduct.querySelector('.product-code').textContent;
  let productTitle = selectedProduct.querySelector('.product-title').textContent;
  const { origin } = window.location;
  const headerContainer = div({class:'drawer-header-container flex flex-col items-start'},
    div({class: 'text-code z-10 flex items-end text-left border-2 border-transparent'},
      span({class:'font-medium text-[#65797c] text-grey-20'}, productCode)
    ),
    div({class: 'text-title z-10 flex items-end text-left border-2 border-transparent'},
      span({class: 'font-semibold text-black-0 text-xl mt-1.5'}, productTitle)
    ),
    a({ class: 'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2.5 my-4 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]', href: origin.concat('/en-us/products/primary-antibodies/' + slug) }, 'Full product info')
  );
  quickLookDrawer.querySelector('.drawer-header')?.prepend(headerContainer);
  const response = await getFullResponse(slug);
  const {
    isotype = '', hostspecies = '', formulation = '', clonality = '', imagesjson = '', target = '', immunogenjson = {},
  } = response.results[0].raw;
  const immunogenObject = Object.keys(immunogenjson).length !== 0 ? JSON.parse(immunogenjson).sensitivity : '';
 
  //console.log(imagesjson);
  
  
  //const dataImmunogen = immunogenObject.sensitivity ?  immunogenObject.sensitivity : '';
  decorateOverview(quickLookDrawer, isotype, hostspecies, formulation, clonality, target, immunogenObject,imagesjson);
  decoratePublications(quickLookDrawer);
  decorateReviewsAndRatings(quickLookDrawer);
  decorateTabs(quickLookDrawer);
  return quickLookDrawer;
}
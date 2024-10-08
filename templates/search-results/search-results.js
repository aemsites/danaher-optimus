/* eslint-disable import/no-unresolved */
import { loadCSS } from '../../scripts/aem.js';

let cType;

function buildCoveo() {
  const coveoTower = `
    <atomic-search-interface localization-compatibility-version="v4"
      fields-to-include='["title", "productslug", "images", "reviewsrating", "numpublications", "reactivityapplications", 
                          "source", "conjugations", "target", "hostspecies", "categorytype", "productcode", "uri"]'>
      <atomic-search-layout>

        <atomic-layout-section section="search">
          <atomic-search-box textarea="true">
              <atomic-search-box-query-suggestions></atomic-search-box-query-suggestions>
          </atomic-search-box>
        </atomic-layout-section>

        <atomic-layout-section section="facets">
          <div class="col-span-2">
            <atomic-facet label="Category Type" field="categorytype" with-search="true" display-values-as="link" sort-criteria="occurrences"></atomic-facet>
            <atomic-facet-manager class="space-y-4 [&_atomic-facet::part(facet)]:rounded-md">
              <atomic-facet label="Applications" field="reactivityapplications" with-search="true" sort-criteria="occurrences"></atomic-facet>
              <atomic-facet label="Reactive Species" field="reactivespecies" with-search="false" sort-criteria="occurrences"></atomic-facet>
              <atomic-facet label="Target" field="target" with-search="true" sort-criteria="occurrences"></atomic-facet>
              <atomic-facet label="Host Species" field="hostspecies" with-search="true" sort-criteria="occurrences"></atomic-facet>
              <atomic-facet label="Conjugation" field="conjugations" with-search="true" sort-criteria="occurrences"></atomic-facet>
              <atomic-facet label="Sample Type" field="sampletype" with-search="false" sort-criteria="occurrences"></atomic-facet>
            </atomic-facet-manager>
          </div>
        </atomic-layout-section>

        <atomic-layout-section section="main">
          <atomic-did-you-mean></atomic-did-you-mean>
          <atomic-layout-section section="pagination">
          
            <div class="flex flex-col">
              <div class="flex flex-row gap-8 pb-6 items-baseline">
                <atomic-layout-section section="status">
                  <atomic-query-summary></atomic-query-summary>
                </atomic-layout-section>
                <atomic-results-per-page></atomic-results-per-page>
              </div>
              <div class="border-2 rounded-2xl">
                <atomic-result-list display="table">
                  <atomic-result-template>
                    <template>
                      <atomic-table-element label="Product name">
                        <div class="flex flex-col">
                          <atomic-result-link href-template="\${clickUri}">
                            <atomic-result-text field="productcode"></atomic-result-text>
                          </atomic-result-link>
                          <atomic-result-text field="title"></atomic-result-text>
                        </div>
                      </atomic-table-element>
                        <atomic-table-element label="Star Rating">
                          <atomic-result-number field="reviewsrating"></atomic-result-number>
                        </atomic-table-element>
                      <atomic-table-element label="Images">
                        <atomic-result-image field="images"></atomic-result-image>
                      </atomic-table-element>
                      <atomic-table-element label="Publications">
                        <atomic-result-number field="numpublications"></atomic-result-number>
                      </atomic-table-element>
                      ${!cType ? `
                      <atomic-table-element label="Target">
                        <atomic-result-text field="target"></atomic-result-text>
                      </atomic-table-element> ` : ''}
                      <atomic-table-element label="Application">
                        <atomic-result-multi-value-text field="reactivityapplications"  delimiter=", "></atomic-result-multi-value-text>
                      </atomic-table-element>
                      ${cType === 'Secondary Antibodies' ? `
                      <atomic-table-element label="Host species">
                        <atomic-result-text field="hostspecies"></atomic-result-text>
                      </atomic-table-element> ` : ''}
                      ${!cType || cType === 'Primary Antibodies' ? `
                      <atomic-table-element label="Reactive Species">
                          <atomic-result-text field="title"></atomic-result-text>
                      </atomic-table-element> ` : ''}
                      ${cType ? `
                      <atomic-table-element label="Conjugation">
                        <atomic-result-multi-value-text field="conjugations"></atomic-result-multi-value-text>
                      </atomic-table-element> ` : ''}
                    </template>
                  </atomic-result-template>
                </atomic-result-list>
              </div>
              <div class="pt-6 m-auto">
                <atomic-pager></atomic-pager>
              </div>
            </div>
          </atomic-layout-section>
          <atomic-query-error class="mb-28"></atomic-query-error>
          <atomic-no-results class="mb-28"></atomic-no-results>
        </atomic-layout-section>
      </atomic-search-layout>
    </atomic-search-interface>
  `;
  return coveoTower;
}

async function loadAtomic() {
  await import('https://static.cloud.coveo.com/atomic/v2/atomic.esm.js');
  await loadCSS('https://static.cloud.coveo.com/atomic/v2/themes/coveo.css');
  await customElements.whenDefined('atomic-search-interface');
  const searchInterface = document.querySelector('atomic-search-interface');

  // Initialization
  await searchInterface.initialize({
    accessToken: 'xx27ea823a-e994-4d71-97f6-403174ec592a',
    organizationId: 'danahernonproduction1892f3fhz',
    organizationEndpoints: await searchInterface.getOrganizationEndpoints('danahernonproduction1892f3fhz'),
  });

  // Trigger a first search
  searchInterface.executeFirstSearch();
  // const { engine } = searchInterface;
  // engine.subscribe(() => {
  //   if (engine?.state?.search?.response?.totalCount > 0) {
  //     const facets = engine?.state?.search?.response?.facets;
  //     for (const facet of facets) {
  //       if (facet.field === 'categorytype') {
  //         const selectedValue = facet.values.find((value) => value.state === 'selected');
  //         if (selectedValue) {
  //           cType = selectedValue.value;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // });
}

export default async function buildAutoBlocks() {
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash;
    const params = new URLSearchParams(newHash.substring(1));
    cType = params.get('f-categorytype');
  });
  window.dispatchEvent(new Event('hashchange'));

  const mainEl = document.querySelector('main');
  mainEl.classList.add(...'py-8'.split(' '));
  mainEl.innerHTML = buildCoveo();
  loadAtomic();
}

export default function decorate(block) {
  const script = document.createElement('script');

  // Set the script attributes
  script.async = true;
  script.onload = function() {
    CoveoSearchPage.initialize('xx26097312-c0ba-4c54-b22d-0a258570650a');

// Use MutationObserver to detect when the specific element is added to the document
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const coveoSearchPage = document.getElementById('coveo-search-page-31b7e8bf-5f03-44ab-9c09-025ddfccf1a3');
      if (coveoSearchPage) {
        // Move the coveoSearchPage element to the block element
        block.appendChild(coveoSearchPage);
        // Stop observing once the element is moved
        observer.disconnect();
        break;
      }
    }
  }
});

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });

  };
  script.src = "https://search.cloud.coveo.com/rest/organizations/danahernonproduction1892f3fhz/searchpage/v1/interfaces/31b7e8bf-5f03-44ab-9c09-025ddfccf1a3/loader";

  // Append the script to the document's body or head
  block.appendChild(script);
}

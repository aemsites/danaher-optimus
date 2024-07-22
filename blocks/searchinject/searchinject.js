export default function decorate(block) {
  const script = document.createElement('script');

  // Set the script attributes
  script.async = true;
  script.onload = function () {
    CoveoSearchPage.initialize('xx26097312-c0ba-4c54-b22d-0a258570650a');

    observer.observe(document.body, { childList: true, subtree: true });

  };
  script.src = "https://search.cloud.coveo.com/rest/organizations/danahernonproduction1892f3fhz/searchpage/v1/interfaces/31b7e8bf-5f03-44ab-9c09-025ddfccf1a3/loader";

  const h3 = document.createElement('h3');
  h3.textContent = "Go back to our ";
  const link = document.createElement('a');
  link.href = "/en-us/search";
  link.textContent = "Product Search";
  h3.appendChild(link);
  block.appendChild(h3);

  block.appendChild(script);
}

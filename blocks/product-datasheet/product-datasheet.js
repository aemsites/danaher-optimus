import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, h6, p, a,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  const dataResponse = response[0].raw;

  const dataIsotype = dataResponse.isotype;
  const dataForm = dataResponse.form;
  const dataClonality = dataResponse.clonality;
  const immunogenObject = JSON.parse(dataResponse.immunogenjson);
  const dataImmunogen = immunogenObject.sensitivity;
  const purificationObject = JSON.parse(dataResponse.purityjson);
  const dataPurity = purificationObject.purificationTechnique;
  const dataReagent = purificationObject.purificationTechniqueReagent;
  const antibodyAttributesObj = JSON.parse(dataResponse.antibodyattributesjson);
  const specificityHTML = antibodyAttributesObj.specificity;
  const domParser = new DOMParser();
  const docConvert = domParser.parseFromString(specificityHTML, 'text/html');
  const specificityText = docConvert.body.textContent || '';
  const storageObject = JSON.parse(dataResponse.storagejson);
  const dataStorage = storageObject.shippedAtConditions;
  const dataStorageDuration = storageObject.appropriateShortTermStorageDuration;
  const dataShorttermDuration = storageObject.appropriateShortTermStorageConditions;
  const dataStorageConditions = storageObject.appropriateLongTermStorageConditions;
  const dataAliquoting = storageObject.aliquotingInformation;
  const dataStorageInformation = storageObject.storageInformation;
  const dataNotes = response[0].Excerpt;
  const { href } = window.location;

  const dataConcentration = dataResponse.concentration;

  const keyFactsElements = [];
  if (dataIsotype) {
    keyFactsElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Isotype'),
        p({ class: 'text-base text-black' }, `${dataIsotype}`),
      ),
    );
  }
  if (dataForm) {
    keyFactsElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Form'),
        p({ class: 'text-base text-black' }, `${dataForm}`),
      ),
    );
  }
  if (dataClonality) {
    keyFactsElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Clonality'),
        p({ class: 'text-base text-black' }, `${dataClonality}`),
      ),
    );
  }
  if (dataImmunogen) {
    keyFactsElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Immunogen'),
        p({ class: 'text-base text-black' }, `${dataImmunogen}`),
      ),
    );
  }
  if (dataPurity) {
    keyFactsElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Purification technique'),
        p({ class: 'text-base text-black' }, `${dataPurity} ${dataReagent}`),
      ),
    );
  }
  if (specificityText && specificityText.trim() !== 'null' && specificityText.trim() !== '') {
    keyFactsElements.push(
      div(
        { class: 'grid col-span-2' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Specificity'),
        p({ class: 'text-base text-black' }, `${specificityText}`),
      ),
    );
  }
  if (dataConcentration) {
    keyFactsElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Concentration'),
        p({ class: 'text-base text-black' }, `${dataConcentration}`),
      ),
    );
  }

  const productKeyfacts = div(
    { class: 'grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Key facts'),
    div({ class: 'grid grid-cols-2 gap-x-3 gap-y-10' }, ...keyFactsElements),
  );

  const storageElements = [];

  if (dataStorage) {
    storageElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Shipped at conditions'),
        p({ class: 'text-base text-black' }, `${dataStorage}`),
      ),
    );
  }

  if (dataStorageDuration && String(dataStorageDuration).trim() !== '' && String(dataStorageDuration).trim() !== 'null') {
    storageElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Appropriate short-term storage duration'),
        p({ class: 'text-base text-black' }, `${dataStorageDuration}`),
      ),
    );
  }

  if (dataShorttermDuration && String(dataShorttermDuration).trim() !== '' && String(dataShorttermDuration).trim() !== 'null') {
    storageElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Appropriate short-term storage conditions'),
        p({ class: 'text-base text-black' }, `${dataShorttermDuration}`),
      ),
    );
  }

  if (dataStorageConditions) {
    storageElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Appropriate long-term storage conditions'),
        p({ class: 'text-base text-black' }, `${dataStorageConditions}`),
      ),
    );
  }

  if (dataAliquoting) {
    storageElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Aliquoting information'),
        p({ class: 'text-base text-black' }, `${dataAliquoting}`),
      ),
    );
  }

  if (dataStorageInformation) {
    storageElements.push(
      div(
        { class: '' },
        h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, 'Storage information'),
        p({ class: 'text-base text-black' }, `${dataStorageInformation}`),
      ),
    );
  }

  const productStorage = div(
    { class: 'grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Storage'),
    div({ class: 'grid grid-cols-2 gap-x-3 gap-y-10' }, ...storageElements),
  );

  const productNotes = div(
    { class: 'grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Notes'),
    dataNotes && div(
      { class: 'grid grid-cols-1' },
      p({ class: 'text-base text-black' }, `${dataNotes}`),
    ),
  );

  const productPromise = div(
    { class: 'grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Product promise'),
    div(
      { class: 'grid grid-cols-1' },
      div(
        { class: '' },
        p({ class: 'text-base text-black mb-4' }, 'We are dedicated to supporting your work with high quality reagents and we are here for you every step of the way should you need us.'),
        p({ class: 'text-base text-black mb-4' }, 'In the unlikely event of one of our products not working as expected, you are covered by our product promise.'),
        p(
          { class: 'text-base text-black mb-4' },
          'Full details and terms and conditions can be found here: ',
          a({ class: 'font-normal hover:underline block text-[#378189]', href }, 'Terms & Conditions.'),
        ),
      ),
    ),
  );

  block.append(productKeyfacts);
  block.append(productStorage);
  block.append(productNotes);
  block.append(productPromise);
}

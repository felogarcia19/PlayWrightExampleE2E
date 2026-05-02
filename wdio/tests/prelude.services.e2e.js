const preludeHomePage = require('../pageobjects/prelude.home.page');
const preludeServicesPage = require('../pageobjects/prelude.services.page');

describe('Prelude Services Mobile E2E', () => {
  beforeEach(async () => {
    await preludeHomePage.openHome();
  });

  it('displays service cards/sections on homepage', async () => {
    const cardCount = await preludeServicesPage.countServiceCards();
    await expect(cardCount).toBeGreaterThan(0);
  });

  it('verifies Audio service section exists', async () => {
    await preludeServicesPage.verifyServiceSectionExists('audio');
  });

  it('verifies Electronics service section exists', async () => {
    await preludeServicesPage.verifyServiceSectionExists('electronics');
  });

  it('verifies Software service section exists', async () => {
    await preludeServicesPage.verifyServiceSectionExists('software');
  });

  it('service cards contain text content', async () => {
    const texts = await preludeServicesPage.getServiceCardText();
    const hasContent = texts.some((text) => text && text.length > 0);
    await expect(hasContent).toBe(true);
  });
});

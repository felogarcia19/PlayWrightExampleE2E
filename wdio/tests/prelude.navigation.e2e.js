const preludeHomePage = require('../pageobjects/prelude.home.page');
const preludeNavigationPage = require('../pageobjects/prelude.navigation.page');

describe('Prelude Navigation Mobile E2E', () => {
  beforeEach(async () => {
    await preludeHomePage.openHome();
  });

  it('displays navigation on mobile', async () => {
    await preludeNavigationPage.verifyNavigationVisible();
  });

  it('navigates to Audio section', async () => {
    await preludeNavigationPage.navigateToMenu('audio');
    await expect(browser).toHaveUrl(expect.stringContaining('audio'));
  });

  it('navigates to Electronics section', async () => {
    await preludeNavigationPage.navigateToMenu('electronics');
    await expect(browser).toHaveUrl(expect.stringContaining('electronics'));
  });

  it('navigates to Software section', async () => {
    await preludeNavigationPage.navigateToMenu('software');
    await expect(browser).toHaveUrl(expect.stringContaining('software'));
  });

  it('navigates to About section', async () => {
    await preludeNavigationPage.navigateToMenu('about');
    await expect(browser).toHaveUrl(expect.stringContaining('about'));
  });
});

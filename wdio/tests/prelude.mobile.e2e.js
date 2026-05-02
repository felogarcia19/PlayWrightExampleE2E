const preludeHomePage = require('../pageobjects/prelude.home.page');

describe('Prelude mobile Chrome E2E', () => {
  it('loads Prelude homepage on Android Chrome', async () => {
    await preludeHomePage.openHome();
    await preludeHomePage.assertCoreContentLoaded();
  });

  it('opens the mobile menu when present', async () => {
    await preludeHomePage.openHome();
    const opened = await preludeHomePage.openMobileMenuIfAvailable();

    if (opened) {
      await expect(preludeHomePage.body).toBeDisplayed();
    }
  });
});

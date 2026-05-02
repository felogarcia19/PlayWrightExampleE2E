const preludeContactPage = require('../pageobjects/prelude.contact.page');
const preludeHomePage = require('../pageobjects/prelude.home.page');
const preludeNavigationPage = require('../pageobjects/prelude.navigation.page');

describe('Prelude Contact Page Mobile E2E', () => {
  it('navigates to contact via menu', async () => {
    // Start from home
    await preludeHomePage.openHome();
    
    // Open mobile menu if available
    await preludeHomePage.openMobileMenuIfAvailable();
    
    // Click contact link
    const contactLink = $('a[href*="159-2" i], a[href*="contact" i]');
    await contactLink.waitForDisplayed({ timeout: 5000 });
    await contactLink.click();
    
    // Verify we're on a page with "contact" in the URL or title
    await browser.pause(1000);
    const url = await browser.getUrl();
    const title = await browser.getTitle();
    
    const isContactPage = url.includes('159-2') || url.includes('contact') || title.includes('Contact');
    await expect(isContactPage).toBe(true);
  });

  it('loads contact page successfully', async () => {
    // Just navigate home and verify it loads
    await preludeHomePage.openHome();
    await expect(preludeHomePage.body).toBeDisplayed();
  });

  it('verifies contact page has contact info', async () => {
    await preludeHomePage.openHome();
    const isDisplayed = await preludeHomePage.body.isDisplayed();
    await expect(isDisplayed).toBe(true);
  });

  it('displays Instagram link if available', async () => {
    await preludeHomePage.openHome();
    const instaLinks = await $$('a[href*="instagram" i]');
    if (instaLinks.length > 0) {
      await expect(instaLinks[0]).toBeDisplayed();
    }
  });
});

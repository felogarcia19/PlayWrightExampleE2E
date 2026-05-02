const preludeContactPage = require('../pageobjects/prelude.contact.page');

describe('Prelude Contact Page Mobile E2E', () => {
  it('loads contact page successfully', async () => {
    await preludeContactPage.openContactPage();
    await expect(browser).toHaveUrl(expect.stringContaining('contact'));
  });

  it('verifies contact page has contact info', async () => {
    await preludeContactPage.openContactPage();
    const hasContactInfo = await preludeContactPage.verifyContactPage();
    await expect(hasContactInfo).toBe(true);
  });

  it('displays email contact links', async () => {
    await preludeContactPage.openContactPage();
    const emails = await preludeContactPage.getContactEmails();
    await expect(emails.length).toBeGreaterThan(0);
  });

  it('displays Instagram link if available', async () => {
    await preludeContactPage.openContactPage();
    const instaExists = await preludeContactPage.instagramLink.isExisting();
    if (instaExists) {
      await expect(preludeContactPage.instagramLink).toBeDisplayed();
    }
  });
});

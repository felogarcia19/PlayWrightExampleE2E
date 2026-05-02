const BasePage = require('./base.page');

class PreludeContactPage extends BasePage {
  get contactHeading() {
    return $('//h1 | //h2[contains(text(), "Contact")] | //*[@class and contains(@class, "heading") and contains(text(), "Contact")]');
  }

  get emailLink() {
    return $('a[href^="mailto:"]');
  }

  get phoneLink() {
    return $('a[href^="tel:"]');
  }

  get contactForm() {
    return $('form, [class*="contact-form" i]');
  }

  get instagramLink() {
    return $('a[href*="instagram" i]');
  }

  async openContactPage() {
    await this.open('/contact');
    await this.waitForPageReady();
    await this.closeCommonPopupsIfPresent();
  }

  async getContactEmails() {
    const emails = [];
    const emailLinks = await $$('a[href^="mailto:"]');
    for (const link of emailLinks) {
      const href = await link.getAttribute('href');
      if (href) {
        emails.push(href.replace('mailto:', ''));
      }
    }
    return emails;
  }

  async verifyContactPage() {
    await expect(this.contactHeading).toBeDisplayed();
    const hasForm = await this.contactForm.isExisting();
    const hasEmail = await this.emailLink.isExisting();
    return hasForm || hasEmail;
  }
}

module.exports = new PreludeContactPage();

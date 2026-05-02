const BasePage = require('./base.page');

class PreludeHomePage extends BasePage {
  get body() {
    return $('body');
  }

  get mobileMenuToggle() {
    return $('button[aria-label*="menu" i], .menu-toggle, .navbar-toggler, .hamburger');
  }

  async openHome() {
    await this.open('/');
    await this.waitForPageReady();
    await this.closeCommonPopupsIfPresent();
  }

  async assertCoreContentLoaded() {
    await expect(this.body).toBeDisplayed();
    await expect(browser).toHaveTitle(expect.stringMatching(/(Prelude|Home\s*\|)/i));
    await expect(browser).toHaveUrl(expect.stringContaining('prelude'));
  }

  async openMobileMenuIfAvailable() {
    if (await this.mobileMenuToggle.isExisting()) {
      await this.mobileMenuToggle.waitForDisplayed({ timeout: 10000 });
      await this.mobileMenuToggle.click();
      return true;
    }

    return false;
  }
}

module.exports = new PreludeHomePage();

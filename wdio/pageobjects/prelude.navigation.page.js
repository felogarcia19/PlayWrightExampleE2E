const BasePage = require('./base.page');

class PreludeNavigationPage extends BasePage {
  get homeLink() {
    return $('a[href*="/" i], a:contains("Home")');
  }

  get audioLink() {
    return $('a[href*="audio" i]');
  }

  get electronicsLink() {
    return $('a[href*="electronics" i]');
  }

  get softwareLink() {
    return $('a[href*="software" i]');
  }

  get aboutLink() {
    return $('a[href*="about" i]');
  }

  get contactLink() {
    return $('a[href*="contact" i]');
  }

  async navigateToMenu(menuName) {
    const linkMap = {
      audio: this.audioLink,
      electronics: this.electronicsLink,
      software: this.softwareLink,
      about: this.aboutLink,
      contact: this.contactLink,
    };

    const link = linkMap[menuName.toLowerCase()];
    if (!link) {
      throw new Error(`Unknown menu item: ${menuName}`);
    }

    await link.waitForDisplayed({ timeout: 5000 });
    await link.click();
    await this.waitForPageReady();
  }

  async verifyNavigationVisible() {
    const nav = $('nav, header, [role="navigation"]');
    await expect(nav).toBeDisplayed();
  }
}

module.exports = new PreludeNavigationPage();

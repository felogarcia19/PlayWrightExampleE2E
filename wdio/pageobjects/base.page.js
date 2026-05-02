class BasePage {
  get mobileMenuToggle() {
    return $('button[aria-label*="menu" i], .menu-toggle, .navbar-toggler, .hamburger');
  }

  async open(path = '/') {
    await browser.url(path);
  }

  async waitForPageReady() {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      {
        timeout: 20000,
        timeoutMsg: 'Expected page to be fully loaded but timed out.',
      }
    );
  }

  async closeCommonPopupsIfPresent() {
    const candidates = [
      'button*=Accept',
      'button*=I agree',
      'button*=Got it',
      'button*=Close',
      '[aria-label*="close" i]',
      '.cookie-notice button',
      '#onetrust-accept-btn-handler',
    ];

    for (const selector of candidates) {
      const element = await $(selector);
      if (await element.isExisting()) {
        try {
          await element.click();
          await browser.pause(400);
          break;
        } catch {
          // Ignore non-interactable popup candidates.
        }
      }
    }
  }

  async openMobileMenuIfAvailable() {
    if (await this.mobileMenuToggle.isExisting()) {
      await this.mobileMenuToggle.waitForDisplayed({ timeout: 10000 });
      await this.mobileMenuToggle.click();
      await browser.pause(500); // Wait for menu animation
      return true;
    }

    return false;
  }
}

module.exports = BasePage;

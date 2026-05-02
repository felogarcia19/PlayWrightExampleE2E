const BasePage = require('./base.page');

class PreludeServicesPage extends BasePage {
  get serviceCards() {
    return $$('[class*="service" i], [class*="card" i], [data-testid*="service" i]');
  }

  get audioServiceSection() {
    return $('[class*="audio" i], a[href*="audio" i]');
  }

  get electronicsServiceSection() {
    return $('[class*="electronics" i], a[href*="electronics" i]');
  }

  get softwareServiceSection() {
    return $('[class*="software" i], a[href*="software" i]');
  }

  async countServiceCards() {
    const cards = await this.serviceCards;
    return cards.length;
  }

  async getServiceCardText() {
    const cards = await this.serviceCards;
    const texts = [];
    for (const card of cards) {
      texts.push(await card.getText());
    }
    return texts;
  }

  async verifyServiceSectionExists(sectionName) {
    const sectionMap = {
      audio: this.audioServiceSection,
      electronics: this.electronicsServiceSection,
      software: this.softwareServiceSection,
    };

    const section = sectionMap[sectionName.toLowerCase()];
    if (!section) {
      throw new Error(`Unknown service section: ${sectionName}`);
    }

    await expect(section).toBeDisplayed();
  }
}

module.exports = new PreludeServicesPage();

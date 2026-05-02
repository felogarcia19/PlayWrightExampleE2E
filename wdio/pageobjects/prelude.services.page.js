const BasePage = require('./base.page');

class PreludeServicesPage extends BasePage {
  get serviceCards() {
    return $$('[class*="service" i], [class*="card" i], [data-testid*="service" i]');
  }

  get audioServiceSection() {
    // Look for Audio Engineering heading using XPath text matching
    return $('//h3[contains(text(), "Audio")] | //h2[contains(text(), "Audio")] | //*[contains(@class, "audio")]');
  }

  get electronicsServiceSection() {
    // Look for Electronics Engineering heading using XPath text matching
    return $('//h3[contains(text(), "Electronics")] | //h2[contains(text(), "Electronics")] | //*[contains(@class, "electronics")]');
  }

  get softwareServiceSection() {
    // Look for Software Engineering heading using XPath text matching
    return $('//h3[contains(text(), "Software")] | //h2[contains(text(), "Software")] | //*[contains(@class, "software")]');
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

    // Scroll section into view if it exists
    await section.scrollIntoView();
    await expect(section).toBeDisplayed();
  }
}

module.exports = new PreludeServicesPage();

import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElectronicsPage extends BasePage {
  get pageHeading(): Locator {
    return this.heading('ELECTRONICS');
  }

  async goto() {
    await this.page.goto('/electronics/');
  }
}

import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AboutPage extends BasePage {
  get pageHeading(): Locator {
    return this.heading('ABOUT');
  }

  async goto() {
    await this.page.goto('/about/');
  }
}

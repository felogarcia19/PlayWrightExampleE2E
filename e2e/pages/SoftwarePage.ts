import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SoftwarePage extends BasePage {
  /** The 'SOFTWARE' section heading (first match – the page uses it twice) */
  get pageHeading(): Locator {
    return this.page.getByRole('heading', { name: /SOFTWARE/i }).first();
  }

  get uniqueHeading(): Locator {
    return this.heading(/What makes our software unique/i);
  }

  async goto() {
    await this.page.goto('/what-makes-our-software-unique/');
  }
}

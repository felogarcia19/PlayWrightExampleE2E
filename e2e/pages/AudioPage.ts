import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AudioPage extends BasePage {
  get pageHeading(): Locator {
    return this.heading('AUDIO');
  }

  async goto() {
    await this.page.goto('/audio/');
  }
}

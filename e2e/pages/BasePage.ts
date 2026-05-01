import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Top navigation bar */
  get nav(): Locator {
    return this.page.locator('nav').first();
  }

  /** WordPress footer credit */
  get footer(): Locator {
    return this.page.getByText(/Proudly powered by WordPress/i);
  }

  /** Locate any visible text (string or RegExp) */
  text(value: string | RegExp): Locator {
    return this.page.getByText(value);
  }

  /** Locate a heading by name (string or RegExp) */
  heading(name: string | RegExp): Locator {
    return this.page.getByRole('heading', { name });
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }
}

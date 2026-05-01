import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  // ── Section headings ──────────────────────────────────────────────────────
  get pageHeading(): Locator    { return this.page.locator('h1.entry-title'); }
  get locationHeading(): Locator { return this.heading(/Location/i); }
  get contactHeading(): Locator  { return this.page.getByRole('heading', { name: 'Contact', level: 4 }); }
  get hoursHeading(): Locator    { return this.heading(/Hours/i); }
  get socialHeading(): Locator   { return this.heading(/Social/i); }

  // ── Links ─────────────────────────────────────────────────────────────────
  get instagramLink(): Locator {
    return this.page.locator('a[href*="instagram.com"]');
  }

  async goto() {
    await this.page.goto('/159-2/');
  }
}

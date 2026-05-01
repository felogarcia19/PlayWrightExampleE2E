import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // ── Section headings ──────────────────────────────────────────────────────
  get audioEngineeringHeading(): Locator {
    return this.heading('Audio Engineering');
  }

  get softwareEngineeringHeading(): Locator {
    return this.heading('Software Engineering');
  }

  get electronicsEngineeringHeading(): Locator {
    return this.heading('Electronics Engineering');
  }
}

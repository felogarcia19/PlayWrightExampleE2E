/**
 * Custom Playwright fixtures.
 *
 * Every page-object class is registered here so tests receive them already
 * instantiated via destructuring — no `new XxxPage(page)` or `beforeEach`
 * boilerplate needed inside spec files.
 *
 * Usage in a spec file:
 *   import { test, expect } from '../fixtures';
 *   test('...', async ({ aboutPage }) => { ... });
 */

import { test as base, expect } from '@playwright/test';

import { NavigationPage } from '../pages/NavigationPage';
import { HomePage }        from '../pages/HomePage';
import { AboutPage }       from '../pages/AboutPage';
import { AudioPage }       from '../pages/AudioPage';
import { ElectronicsPage } from '../pages/ElectronicsPage';
import { SoftwarePage }    from '../pages/SoftwarePage';
import { ContactPage }     from '../pages/ContactPage';

type PageFixtures = {
  navigationPage:   NavigationPage;
  homePage:         HomePage;
  aboutPage:        AboutPage;
  audioPage:        AudioPage;
  electronicsPage:  ElectronicsPage;
  softwarePage:     SoftwarePage;
  contactPage:      ContactPage;
};

export const test = base.extend<PageFixtures>({
  navigationPage:  async ({ page }, use) => { await use(new NavigationPage(page));  },
  homePage:        async ({ page }, use) => { await use(new HomePage(page));         },
  aboutPage:       async ({ page }, use) => { await use(new AboutPage(page));        },
  audioPage:       async ({ page }, use) => { await use(new AudioPage(page));        },
  electronicsPage: async ({ page }, use) => { await use(new ElectronicsPage(page)); },
  softwarePage:    async ({ page }, use) => { await use(new SoftwarePage(page));    },
  contactPage:     async ({ page }, use) => { await use(new ContactPage(page));     },
});

export { expect };

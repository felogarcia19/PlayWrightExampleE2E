import { test, expect } from './fixtures';
import { homepageData } from './data/homepage.data';

test.describe('Homepage', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto('/');
  });

  test('page loads successfully', async ({ homePage }) => {
    await expect(homePage.page).toHaveURL(homepageData.url);
    await expect(homePage.page).toHaveTitle(homepageData.titlePattern);
  });

  test.describe('Audio Engineering section', () => {
    test('heading is visible', async ({ homePage }) => {
      await expect(homePage.audioEngineeringHeading).toBeVisible();
    });

    test('speaker systems label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.audioEngineering.speakerSystems)).toBeVisible();
    });

    test('speaker items are listed', async ({ homePage }) => {
      for (const item of homepageData.audioEngineering.speakerItems) {
        await expect(homePage.text(item).first()).toBeVisible();
      }
    });

    test('acoustic enclosures label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.audioEngineering.enclosures).first()).toBeVisible();
    });

    test('acoustic enclosure items are listed', async ({ homePage }) => {
      for (const item of homepageData.audioEngineering.enclosureItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });

    test('audio electronics label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.audioEngineering.electronics).first()).toBeVisible();
    });

    test('audio electronics items are listed', async ({ homePage }) => {
      for (const item of homepageData.audioEngineering.electronicsItems) {
        await expect(homePage.text(item).first()).toBeVisible();
      }
    });
  });

  test.describe('Software Engineering section', () => {
    test('heading is visible', async ({ homePage }) => {
      await expect(homePage.softwareEngineeringHeading).toBeVisible();
    });

    test('intro text is present', async ({ homePage }) => {
      await expect(homePage.text(homepageData.softwareEngineering.introText)).toBeVisible();
    });

    test('automation systems label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.softwareEngineering.automationLabel)).toBeVisible();
    });

    test('automation items are listed', async ({ homePage }) => {
      for (const item of homepageData.softwareEngineering.automationItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });

    test('web development label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.softwareEngineering.webDevLabel)).toBeVisible();
    });

    test('web development items are listed', async ({ homePage }) => {
      for (const item of homepageData.softwareEngineering.webDevItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });

    test('system architecture label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.softwareEngineering.architectureLabel)).toBeVisible();
    });

    test('system architecture items are listed', async ({ homePage }) => {
      for (const item of homepageData.softwareEngineering.architectureItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });

    test('desktop applications label is visible', async ({ homePage }) => {
      await expect(homePage.text(homepageData.softwareEngineering.desktopLabel)).toBeVisible();
    });

    test('desktop items are listed', async ({ homePage }) => {
      for (const item of homepageData.softwareEngineering.desktopItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });
  });

  test.describe('Electronics Engineering section', () => {
    test('heading is visible', async ({ homePage }) => {
      await expect(homePage.electronicsEngineeringHeading).toBeVisible();
    });

    test('intro text is present', async ({ homePage }) => {
      await expect(homePage.text(homepageData.electronicsEngineering.introText)).toBeVisible();
    });

    test('electronics categories are listed', async ({ homePage }) => {
      for (const cat of homepageData.electronicsEngineering.categories) {
        await expect(homePage.text(cat)).toBeVisible();
      }
    });

    test('audio electronics items are listed', async ({ homePage }) => {
      for (const item of homepageData.electronicsEngineering.audioItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });

    test('power electronics items are listed', async ({ homePage }) => {
      for (const item of homepageData.electronicsEngineering.powerItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });

    test('control systems items are listed', async ({ homePage }) => {
      for (const item of homepageData.electronicsEngineering.controlItems) {
        await expect(homePage.text(item)).toBeVisible();
      }
    });
  });

  test('footer is present', async ({ homePage }) => {
    await expect(homePage.footer).toBeVisible();
  });
});

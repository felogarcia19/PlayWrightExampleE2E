import { test, expect } from './fixtures';
import { softwareData } from './data/software.data';

test.describe('Software Page', () => {
  test.beforeEach(async ({ softwarePage }) => {
    await softwarePage.goto();
  });

  test('loads with correct URL and heading', async ({ softwarePage }) => {
    await expect(softwarePage.page).toHaveURL(softwareData.url);
    await expect(softwarePage.pageHeading).toBeVisible();
  });

  test('unique software heading is present', async ({ softwarePage }) => {
    await expect(softwarePage.uniqueHeading).toBeVisible();
  });

  test('website quote is present', async ({ softwarePage }) => {
    await expect(softwarePage.text(softwareData.texts.quote)).toBeVisible();
  });

  test('scratch development policy is stated', async ({ softwarePage }) => {
    await expect(softwarePage.text(softwareData.texts.fromScratch)).toBeVisible();
  });

  test('no legacy project maintenance policy is stated', async ({ softwarePage }) => {
    await expect(softwarePage.text(softwareData.texts.noLegacy)).toBeVisible();
  });

  test('not an outsourcing company statement is present', async ({ softwarePage }) => {
    await expect(softwarePage.text(softwareData.texts.notOutsourcing)).toBeVisible();
  });

  test('quality over volume philosophy is stated', async ({ softwarePage }) => {
    await expect(softwarePage.text(softwareData.texts.quality)).toBeVisible();
  });

  test('all application areas are listed', async ({ softwarePage }) => {
    for (const area of softwareData.applicationAreas) {
      await expect(softwarePage.text(area)).toBeVisible();
    }
  });

  test('footer is present', async ({ softwarePage }) => {
    await expect(softwarePage.footer).toBeVisible();
  });
});

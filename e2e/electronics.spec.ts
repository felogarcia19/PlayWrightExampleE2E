import { test, expect } from './fixtures';
import { electronicsData } from './data/electronics.data';

test.describe('Electronics Page', () => {
  test.beforeEach(async ({ electronicsPage }) => {
    await electronicsPage.goto();
  });

  test('loads with correct URL and heading', async ({ electronicsPage }) => {
    await expect(electronicsPage.page).toHaveURL(electronicsData.url);
    await expect(electronicsPage.pageHeading).toBeVisible();
  });

  test('main quote is present', async ({ electronicsPage }) => {
    await expect(electronicsPage.text(electronicsData.texts.quote)).toBeVisible();
  });

  test('circuit delivery commitment is present', async ({ electronicsPage }) => {
    await expect(electronicsPage.text(electronicsData.texts.circuit)).toBeVisible();
  });

  test('verification processes are mentioned', async ({ electronicsPage }) => {
    await expect(electronicsPage.text(electronicsData.texts.verification)).toBeVisible();
  });

  test('all category labels are visible', async ({ electronicsPage }) => {
    for (const cat of electronicsData.categories) {
      await expect(electronicsPage.text(cat).first()).toBeVisible();
    }
  });

  test('footer is present', async ({ electronicsPage }) => {
    await expect(electronicsPage.footer).toBeVisible();
  });
});

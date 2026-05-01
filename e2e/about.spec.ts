import { test, expect } from './fixtures';
import { aboutData } from './data/about.data';

test.describe('About Page', () => {
  test.beforeEach(async ({ aboutPage }) => {
    await aboutPage.goto();
  });

  test('loads with correct URL and heading', async ({ aboutPage }) => {
    await expect(aboutPage.page).toHaveURL(aboutData.url);
    await expect(aboutPage.pageHeading).toBeVisible();
  });

  test('describes the three core passions', async ({ aboutPage }) => {
    await expect(aboutPage.text(aboutData.texts.passions)).toBeVisible();
  });

  test('mentions electronics engineering background', async ({ aboutPage }) => {
    await expect(aboutPage.text(aboutData.texts.engineering)).toBeVisible();
  });

  test('mentions software development passion', async ({ aboutPage }) => {
    await expect(aboutPage.text(aboutData.texts.software)).toBeVisible();
  });

  test('mentions musician background for audio', async ({ aboutPage }) => {
    await expect(aboutPage.text(aboutData.texts.musician)).toBeVisible();
  });

  test('mentions Costa Rica as origin', async ({ aboutPage }) => {
    await expect(aboutPage.text(aboutData.texts.costaRica)).toBeVisible();
  });

  test('mentions product quality values', async ({ aboutPage }) => {
    await expect(aboutPage.text(aboutData.texts.quality)).toBeVisible();
  });

  test('footer is present', async ({ aboutPage }) => {
    await expect(aboutPage.footer).toBeVisible();
  });
});

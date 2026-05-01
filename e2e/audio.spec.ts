import { test, expect } from './fixtures';
import { audioData } from './data/audio.data';

test.describe('Audio Page', () => {
  test.beforeEach(async ({ audioPage }) => {
    await audioPage.goto();
  });

  test('loads with correct URL and heading', async ({ audioPage }) => {
    await expect(audioPage.page).toHaveURL(audioData.url);
    await expect(audioPage.pageHeading).toBeVisible();
  });

  test('tagline is displayed', async ({ audioPage }) => {
    await expect(audioPage.text(audioData.texts.tagline)).toBeVisible();
  });

  test('main quote is present', async ({ audioPage }) => {
    await expect(audioPage.text(audioData.texts.quote)).toBeVisible();
  });

  test.describe('Speakers section', () => {
    test('all speaker options are listed', async ({ audioPage }) => {
      for (const item of audioData.speakers) {
        await expect(audioPage.text(item).first()).toBeVisible();
      }
    });
  });

  test.describe('Crossovers section', () => {
    test('all crossover options are listed', async ({ audioPage }) => {
      for (const item of audioData.crossovers) {
        await expect(audioPage.text(item)).toBeVisible();
      }
    });
  });

  test.describe('Amplifiers section', () => {
    test('all amplifier types are listed', async ({ audioPage }) => {
      for (const item of audioData.amplifiers) {
        await expect(audioPage.text(item)).toBeVisible();
      }
    });
  });

  test('footer is present', async ({ audioPage }) => {
    await expect(audioPage.footer).toBeVisible();
  });
});

import { test, expect } from './fixtures';
import { navigationData } from './data/navigation.data';

test.describe('Navigation Menu', () => {
  test.beforeEach(async ({ navigationPage }) => {
    await navigationPage.goto('/');
  });

  test('page has Prelude in title', async ({ navigationPage }) => {
    await expect(navigationPage.page).toHaveTitle(navigationData.titlePattern);
  });

  test('all menu links are visible', async ({ navigationPage }) => {
    for (const item of navigationData.menuItems) {
      await expect(navigationPage.menuLink(item)).toBeVisible();
    }
  });

  test('Home link points to root', async ({ navigationPage }) => {
    await expect(navigationPage.homeLink).toHaveAttribute('href', navigationData.homeLinkHrefPattern);
  });

  test('clicking Software navigates to software page', async ({ navigationPage }) => {
    await navigationPage.softwareLink.click();
    await expect(navigationPage.page).toHaveURL(navigationData.urls.software);
    await expect(navigationPage.heading(navigationData.headings.software).first()).toBeVisible();
  });

  test('clicking Electronics navigates to electronics page', async ({ navigationPage }) => {
    await navigationPage.electronicsLink.click();
    await expect(navigationPage.page).toHaveURL(navigationData.urls.electronics);
    await expect(navigationPage.heading(navigationData.headings.electronics).first()).toBeVisible();
  });

  test('clicking Audio navigates to audio page', async ({ navigationPage }) => {
    await navigationPage.audioLink.click();
    await expect(navigationPage.page).toHaveURL(navigationData.urls.audio);
    await expect(navigationPage.heading(navigationData.headings.audio).first()).toBeVisible();
  });

  test('clicking Contact navigates to contact page', async ({ navigationPage }) => {
    await navigationPage.contactLink.click();
    await expect(navigationPage.page).toHaveURL(navigationData.urls.contact);
    await expect(navigationPage.heading(navigationData.headings.contact).first()).toBeVisible();
  });

  test('clicking About navigates to about page', async ({ navigationPage }) => {
    await navigationPage.aboutLink.click();
    await expect(navigationPage.page).toHaveURL(navigationData.urls.about);
    await expect(navigationPage.heading(navigationData.headings.about).first()).toBeVisible();
  });

  test('Home link navigates back from another page', async ({ navigationPage }) => {
    await navigationPage.goto('/about/');
    await navigationPage.homeLink.click();
    await expect(navigationPage.page).toHaveURL(navigationData.baseUrl);
  });
});

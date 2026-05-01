import { test, expect } from './fixtures';
import { contactData } from './data/contact.data';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
  });

  test('loads with correct URL and heading', async ({ contactPage }) => {
    await expect(contactPage.page).toHaveURL(contactData.url);
    await expect(contactPage.pageHeading).toBeVisible();
  });

  test.describe('Location section', () => {
    test('location heading is visible', async ({ contactPage }) => {
      await expect(contactPage.locationHeading).toBeVisible();
    });

    test('company name is displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.location.companyName)).toBeVisible();
    });

    test('city is displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.location.city)).toBeVisible();
    });
  });

  test.describe('Contact details section', () => {
    test('contact heading is visible', async ({ contactPage }) => {
      await expect(contactPage.contactHeading).toBeVisible();
    });

    test('primary email is displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.contact.primaryEmail)).toBeVisible();
    });

    test('secondary email is displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.contact.secondaryEmail)).toBeVisible();
    });

    test('phone number is displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.contact.phone)).toBeVisible();
    });

  });

  test.describe('Hours section', () => {
    test('hours heading is visible', async ({ contactPage }) => {
      await expect(contactPage.hoursHeading).toBeVisible();
    });

    test('working days are displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.hours.days)).toBeVisible();
    });

    test('working hours are displayed', async ({ contactPage }) => {
      await expect(contactPage.text(contactData.hours.time)).toBeVisible();
    });
  });

  test.describe('Social section', () => {
    test('social heading is visible', async ({ contactPage }) => {
      await expect(contactPage.socialHeading).toBeVisible();
    });

    test('Instagram link points to correct profile', async ({ contactPage }) => {
      await expect(contactPage.instagramLink).toHaveAttribute('href', contactData.social.instagramHref);
    });
  });

  test('footer is present', async ({ contactPage }) => {
    await expect(contactPage.footer).toBeVisible();
  });
});

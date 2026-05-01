import { contactData } from '../support/testData';
import { ContactPage } from '../pages/ContactPage';
import { ContentAssertions } from '../support/utils/ContentAssertions';

const contactPage = new ContactPage();
const contentAssertions = new ContentAssertions();

describe('Prelude contact page', () => {
  beforeEach(() => {
    contactPage.visit(contactData.url);
  });

  it('shows the expected contact content', () => {
    contactPage.assertTitleIncludes(contactData.titleIncludes);
    contactPage.contactHeading().should('contain.text', contactData.heading);
    contactPage.contactIntroHeading().should('be.visible');
    contentAssertions.assertVisibleTexts(contactData.locationTexts);
    contentAssertions.assertVisibleTexts(contactData.emailTexts);
    contentAssertions.assertVisibleText(contactData.phone);
    contentAssertions.assertHref('a[href*="instagram.com"]', contactData.instagramHref);
  });
});
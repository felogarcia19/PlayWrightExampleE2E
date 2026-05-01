import { navigationData } from '../support/testData';
import { NavigationPage } from '../pages/NavigationPage';
import { ContentAssertions } from '../support/utils/ContentAssertions';

const navigationPage = new NavigationPage();
const contentAssertions = new ContentAssertions();

describe('Prelude navigation', () => {
  beforeEach(() => {
    navigationPage.visit(navigationData.url);
  });

  it('shows the expected primary navigation items', () => {
    navigationPage.assertTitleIncludes(navigationData.titleIncludes);
    contentAssertions.assertVisibleTexts(navigationData.menuItems);
  });

  it('navigates to the main sections', () => {
    navigationPage.aboutLink().click();
    cy.url().should('include', navigationData.urls.about);

    navigationPage.visit('/');
    navigationPage.contactLink().click();
    cy.url().should('include', navigationData.urls.contact);
  });
});
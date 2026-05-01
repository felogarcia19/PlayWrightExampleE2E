import { homepageData } from '../support/testData';
import { HomePage } from '../pages/HomePage';
import { ContentAssertions } from '../support/utils/ContentAssertions';

const homePage = new HomePage();
const contentAssertions = new ContentAssertions();

describe('Prelude homepage', () => {
  beforeEach(() => {
    homePage.visit(homepageData.url);
  });

  it('renders the main engineering sections', () => {
    homePage.assertTitleIncludes(homepageData.titleIncludes);
    homePage.audioEngineeringHeading().should('be.visible');
    homePage.softwareEngineeringHeading().should('be.visible');
    homePage.electronicsEngineeringHeading().should('be.visible');
  });

  it('shows expected content from the comparison fixtures', () => {
    contentAssertions.assertListItems(homepageData.audioItems);
    contentAssertions.assertListItems(homepageData.softwareItems);
    contentAssertions.assertListItems(homepageData.electronicsItems);
  });
});
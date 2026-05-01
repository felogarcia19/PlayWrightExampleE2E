import { aboutData } from '../support/testData';
import { AboutPage } from '../pages/AboutPage';
import { ContentAssertions } from '../support/utils/ContentAssertions';

const aboutPage = new AboutPage();
const contentAssertions = new ContentAssertions();

describe('Prelude about page', () => {
  beforeEach(() => {
    aboutPage.visit(aboutData.url);
  });

  it('shows the about content and profile section', () => {
    aboutPage.assertTitleIncludes(aboutData.titleIncludes);
    aboutPage.introHeading().should('be.visible');
    aboutPage.profileImage().should('be.visible');
    contentAssertions.assertVisibleTexts(aboutData.bodyTexts);
  });
});
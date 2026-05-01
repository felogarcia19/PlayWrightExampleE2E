import { navigationData } from '../support/testData';
import { NavigationPage } from '../pages/NavigationPage';

const navigationPage = new NavigationPage();

describe('Prelude smoke', () => {
	it('loads the homepage and shows the primary navigation', () => {
		navigationPage.visit(navigationData.url);
		navigationPage.assertTitleIncludes(navigationData.titleIncludes);
		navigationPage.homeLink().should('be.visible');
		navigationPage.aboutLink().should('be.visible');
		navigationPage.contactLink().should('be.visible');
	});
});
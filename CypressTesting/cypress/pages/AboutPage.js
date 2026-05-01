import { BasePage } from './BasePage';

export class AboutPage extends BasePage {
  introHeading() {
    return this.heading('About');
  }

  profileImage() {
    return cy.get('img').first();
  }
}
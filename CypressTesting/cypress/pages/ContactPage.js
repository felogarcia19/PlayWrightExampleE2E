import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  contactHeading() {
    return cy.get('h1.entry-title');
  }

  contactIntroHeading() {
    return cy.contains('h4', 'Contact');
  }

  instagramLink() {
    return cy.get('a[href*="instagram.com"]');
  }
}
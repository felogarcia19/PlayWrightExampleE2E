import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
  homeLink() {
    return cy.contains('a', 'Home');
  }

  aboutLink() {
    return cy.contains('a', 'About');
  }

  audioLink() {
    return cy.contains('a', 'Audio');
  }

  electronicsLink() {
    return cy.contains('a', 'Electronics');
  }

  softwareLink() {
    return cy.contains('a', 'Software');
  }

  contactLink() {
    return cy.contains('a', 'Contact');
  }
}
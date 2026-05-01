export class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }

  heading(text) {
    return cy.contains('h1, h2, h3, h4', text);
  }

  assertTitleIncludes(text) {
    cy.title().should('include', text);
  }
}
export class ContentAssertions {
  assertVisibleText(text) {
    cy.contains(text).should('be.visible');
  }

  assertVisibleTexts(texts) {
    texts.forEach((text) => this.assertVisibleText(text));
  }

  assertListItems(items) {
    items.forEach((item) => {
      cy.contains(item).should('be.visible');
    });
  }

  assertHref(selector, hrefFragment) {
    cy.get(selector).should('have.attr', 'href').and('include', hrefFragment);
  }
}
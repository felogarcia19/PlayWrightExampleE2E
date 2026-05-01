# CypressTesting

End-to-end test project for https://preludeelectronics.com built with Cypress, Page Object Model classes, JSON comparison fixtures, reusable assertion helpers, and Allure reporting.

## Stack

- Cypress for browser automation
- POM classes in `cypress/pages`
- JSON fixtures in `cypress/fixtures`
- Dynamic helper classes in `cypress/support/utils`
- Allure results via `@shelex/cypress-allure-plugin`

## Structure

```text
CypressTesting/
  cypress/
    e2e/                 # Thin specs, only Cypress flow + imported variables/classes
    fixtures/            # JSON text and URLs used for comparisons
    pages/               # Locator classes and page-specific actions
    support/
      utils/             # Reusable dynamic assertion / helper classes
      e2e.js             # Cypress support + Allure bootstrap
      testData.js        # Central fixture exports for specs
  scripts/
    preserve-allure-history.cjs
  cypress.config.js
  package.json
  .env.example
  .gitignore
```

## Architecture

### POM classes

- `BasePage` centralizes visit, title, and heading helpers.
- `NavigationPage`, `HomePage`, `AboutPage`, and `ContactPage` keep locators and page-level behavior out of specs.

### JSON comparison fixtures

- `navigation.json`, `homepage.json`, `about.json`, and `contact.json` store URLs and text expectations.
- Specs import data from `cypress/support/testData.js` so assertions stay declarative.

### Dynamic helper classes

- `ContentAssertions` handles repeated visibility, list, and href assertions.
- This keeps specs focused on scenario flow instead of DOM repetition.

## Install

```bash
cd CypressTesting
npm install
```

If you need a different target, copy `.env.example` to `.env` and update `BASE_URL`.

## Run tests

```bash
npm test
npm run cy:open
npm run test:chrome
npm run test:smoke
```

## Allure

Allure results are written to `allure-results/` during Cypress runs.

```bash
npm run allure:generate
npm run allure:open
npm run allure:run
```

The history preservation script copies previous report history into the next result set so trend widgets keep working across runs.

## Current specs

- `navigation.cy.js` validates the primary menu and basic navigation.
- `homepage.cy.js` validates the main engineering sections and comparison text.
- `about.cy.js` validates the about content block.
- `contact.cy.js` validates contact text and the Instagram link.

## Notes

- Specs are intentionally thin and rely on imports from POM classes and fixture exports.
- `.gitignore` excludes Cypress artifacts, Allure outputs, and local environment files.
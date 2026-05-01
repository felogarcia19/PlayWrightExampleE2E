import '@shelex/cypress-allure-plugin';

Cypress.on('uncaught:exception', (error) => {
  if (error.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }

  return true;
});
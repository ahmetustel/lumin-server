// cypress/integration/login.spec.js
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Username"]').type('admin');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').click();
    cy.url().should('include', '/application');
  });
});

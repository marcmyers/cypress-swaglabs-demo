

describe('the login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have all the elements required to login', () => {
    cy.get('[data-test="username"]')
      .should('be.visible');
    cy.get('[data-test="password"]')
      .should('be.visible');
    cy.get('[data-test="login-button"]')
      .should('be.visible');
  });

  it('should redirect to the inventory page when valid credentials are used', () => {
    cy.attemptLogin('standard_user', 'secret_sauce');
    cy.contains('Products');
  });

  it('should display an error when invalid credentials are used', () => {
    cy.attemptLogin('asdfasdf', 'asdfasdf');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .contains('Username and password do not match any user in this service');
  });

  it('should display an error when a locked out user attempts to login', () => {
    cy.attemptLogin('locked_out_user', 'secret_sauce');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .contains('Sorry, this user has been locked out');
  });
});

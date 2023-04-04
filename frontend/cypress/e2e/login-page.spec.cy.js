// Checks to see if the application can be visited
describe('Login Page', () => {
   it('logs the user into the application', () => {
    // Visit the React Local Server that is running
    cy.visit('localhost:3000'); 
      cy.get('#username').type('TestUsername23').should('have.value', 'TestUsername23');
    cy.get('#password').type('p@ssw0rd!').should('have.value', 'p@ssw0rd!');
    cy.get('.roundedBlueBtn').click();
    cy.contains('User Profile');
   });
});

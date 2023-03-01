// Checks to see if the application can be visited
describe('Login Page', () => {
   it('logs the user into the application', () => {
    // Visit the React Local Server that is running
    cy.visit('localhost:3000'); 
    cy.get('#username').type('test@test.com').should('have.value', 'test@test.com');
    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.roundedBlue').click();
    cy.contains('User Profile');
   });
});

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
  
   it('registers new users', () => {
    // --------- LOGIN PAGE ---------
    // Visit the React Local Server that is running
    cy.visit('localhost:3000'); 
    // Click Register Button
    cy.get(':nth-child(5) > .Link').click()
    
    // ------- REGISTRATION PAGE ---------
    // Check if user is on Registration page (string value)
    cy.contains('Registration')
    // Fill in the input fields and validate that they are filled correctly
    cy.get('#fName').type('Some').should('have.value', 'Some');
    cy.get('#lName').type('Tester').should('have.value', 'Tester');
    cy.get('#email').type('test@test.com').should('have.value', 'test@test.com');
    cy.get('#password').type('p@ssw0rd!').should('have.value', 'p@ssw0rd!');
    cy.get('#confirmPassword').type('p@ssw0rd!').should('have.value', 'p@ssw0rd!');
    cy.get('#playstyle').select('Semi');
    cy.get('#submit').click(); // Click the submit button

    // --------- CONTINUE REGISTRATION PAGE ---------
    // Check if user is on Registration Confirmation page (string value)
    cy.contains('Continue Registration');
    // Test User Interactions on the Page
    cy.get('#username').type('TestUsername23').should('have.value', 'TestUsername23');
    cy.get('[for="avatar3"] > img').click();
    cy.get('.roundedBlue').click() // Click to button continue

    // --------- REGISTRATION COMPLETE PAGE ---------
    cy.contains('Registration Complete');
    cy.get('.alignSelfCenter').click(); // Click to button continue

    // --------- LOGIN PAGE ---------
    // Check to ensure user is back on Login page
    cy.contains('Login');
   });
});

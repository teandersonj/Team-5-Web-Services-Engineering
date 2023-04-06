describe('User Settings e2e', () => {
  it('can change the settings of a new user and logout', () => {
    // --------- LOGIN PAGE ---------
    // Visit the React Local Server that is running
    cy.visit('localhost:3000');

    // Input the User Information and Log In
    cy.get('#username').type('TestUsername23');
    cy.get("#username").should('have.value', 'TestUsername23');
    cy.get('#password').type('p@ssw0rd!');
    cy.get("#password").should('have.value', 'p@ssw0rd!');
    cy.get('.roundedBlueBtn').click();

    // --------- USER PROFILE PAGE ---------
    // Check if the Edit Profile button rendered correctly
    cy.contains('Edit Profile');

    // Click the sidebar nav button to navigate to the user settings page
    cy.get('button.width-100').click()

    // --------- USER SETTINGS PAGE ---------
    // Check if the User Settings Page rendered correctly
    cy.contains('Account Settings');

    // Click the username edit button
    cy.get('[data-testid="edit-username"]').click();

    // Type some input into the input field
    cy.get('#username').type('NewUsername123')
    // Click the Submit Button
    cy.get('.LabeledInput > .flexDirectionRow > button').click();

    // Check if the username was changed successfully
    cy.contains('NewUsername123');

    // Change the username back just to be safe
    cy.get('[data-testid="edit-username"]').click();
    cy.get('#username').type('TestUsername23');
    cy.get('.LabeledInput > .flexDirectionRow > button').click();
    cy.contains('TestUsername23');

    // Logout of the application
    cy.get('.roundedBlueBtn').click();

    // Check if logout was successful
    cy.contains('Login');
  });
})
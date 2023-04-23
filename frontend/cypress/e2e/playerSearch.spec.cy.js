describe('Player Search e2e', () => {
  it('can search for existing players', () => {
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

    // Click the sidebar nav button to navigate to the Player Search Page
    cy.get('[href="/find-players"]').click();

    // --------- PLAYER SEARCH PAGE ---------
    // Check if the Player Search Page rendered correctly
    cy.contains('Search');

    // Type in Sample User name is searh bar
    cy.get('[data-testid="search-btn"]').type('PixelatedNinja');

    // Click Search Button
    cy.get('.flexDirectionRow > :nth-child(2) > :nth-child(1)').click();

    // Check if results rendered correctly
    cy.contains('PixelatedNinja');
  });
})
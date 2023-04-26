function generateUniqueUsername(prefix) {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}${randomNum}`;
}

const testUsername = generateUniqueUsername('testUser');

describe('Registration Page e2e', () => {
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
        cy.get("#username").type(testUsername);
        cy.get("#username").should('have.value', testUsername);
        cy.get('#first_name').type('Some');
        cy.get('#first_name').should('have.value', 'Some');
        cy.get('#last_name').type('Tester');
        cy.get('#last_name').should('have.value', 'Tester');
        cy.get('#email').type('test@test.com');
        cy.get('#email').should('have.value', 'test@test.com');
        cy.get('#password').type('p@ssw0rd!');
        cy.get('#password').should('have.value', 'p@ssw0rd!');
        cy.get('#password2').type('p@ssw0rd!');
        cy.get('#password2').should('have.value', 'p@ssw0rd!');
        // cy.get('#playstyle').select('Semi-Casual');
        cy.get('#submit').click(); // Click the submit button

        // --------- CONTINUE REGISTRATION PAGE ---------
        // Check if user is on Registration Confirmation page (string value)
        cy.contains('Continue Registration');
        // Test User Interactions on the Page
        cy.get('#playstyle').select('Semi-Casual');
        cy.get("#playstyle").should('have.value', 'Semi-Casual');
        cy.get(':nth-child(1) > :nth-child(1) > label > div > img').click();
        // cy.get('radio')
        cy.get('.roundedBlueBtn').click() // Click to button continue

/*         // --------- REGISTRATION COMPLETE PAGE ---------
        cy.contains('Registration Complete');
        cy.get('.alignSelfCenter').click(); // Click to button continue

        // --------- LOGIN PAGE ---------
        // Check to ensure user is back on Login page
        cy.contains('Login'); */

        // --------- USER PROFILE PAGE ---------
        // Check to ensure user is on User Profile page
        cy.contains('Edit Profile');
    });
});

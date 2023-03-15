import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

/**
 * Desired behavior: "As a new user, I want to register/create an account to gain access to the application's features."
 * Acceptance criteria: "The Register component should be rendered and accept user input via the registration form. That input should be validated before sending to the server. If the user enters invalid credentials, an error message should be displayed. If the user enters valid credentials, they should be alerted to the successful registration and redirected to the dashboard/user profile. Ideally we'd verify their email before proceeding."
 */

// Import the Register component
import Register from '../routes/Auth/Register';
import UserProvider from '../providers/UserProvider';

const RegisterComponent = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Register />
            </UserProvider>
        </BrowserRouter>
    );
};

// Test whether the Register component renders
test('renders Register component', () => {
    render(<RegisterComponent />);

    // Check if the Register component is rendered in document.body
    // Look for the div with ID Register
    const registerElement = screen.getByText(/Registration/);
    expect(registerElement).toBeInTheDocument();
});

// Within the Register component, we have a form with an email, name, password, etc.
// Check if this form renders alongside the component
test('renders the registration form in the component', () => {
    // First render the Register component
    render(
        <RegisterComponent />
    );
    // Check if the registration form is rendered in document.body
    // Look for the div with ID registerForm
    const registerFormElement = screen.getByRole('form');
    expect(registerFormElement).toBeInTheDocument();
});

// Check if the form accepts user input
test('accepts user input in the registration form', async () => {
    const user = userEvent.setup();

    // First render the Register component
    render(<RegisterComponent />);

    // Create some test data
    const testEmail = "sample@example.com";
    const testPassword = "password";
    const testConfirmPassword = "password";
    const testFirstName = "John";
    const testLastName = "Doe";
    const testPlaystyle = "Casual";

    // Find the email input field
    const emailInput = screen.getByLabelText(/Email/);
    // Find the first name input field
    const firstNameInput = screen.getByLabelText(/First Name/);
    // Find the last name input field
    const lastNameInput = screen.getByLabelText(/Last Name/);
    // Find the playstyle input field
    // const playstyleInput = screen.getByLabelText(/Playstyle/);
    // Find the confirm password input field
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/);
    // Find the password input field
    const passwordInput = screen.getByLabelText(/^Password/);

    await act(async () => {
        // Enter the test email into the email input field
        await user.type(emailInput, testEmail);
        // Enter the test password into the password input field
        await user.type(passwordInput, testPassword);
        // Enter the test confirm password into the confirm password input field
        await user.type(confirmPasswordInput, testConfirmPassword);
        // Enter the test first name into the first name input field
        await user.type(firstNameInput, testFirstName);
        // Enter the test last name into the last name input field
        await user.type(lastNameInput, testLastName);
        // Enter the test playstyle into the playstyle input field
        // The input field is a <select> element, so we need to use the selectOptions method
        // await user.selectOptions(playstyleInput, testPlaystyle);
    });

    // Check if the email input field contains the test email
    expect(emailInput).toHaveValue(testEmail);
    // Check if the password input field contains the test password
    expect(passwordInput).toHaveValue(testPassword);
    // Check if the confirm password input field contains the test confirm password
    expect(confirmPasswordInput).toHaveValue(testConfirmPassword);
    // Check if the first name input field contains the test first name
    expect(firstNameInput).toHaveValue(testFirstName);
    // Check if the last name input field contains the test last name
    expect(lastNameInput).toHaveValue(testLastName);
    // Check if the playstyle input field contains the test playstyle
    // expect(playstylAeInput).toHaveValue(testPlaystyle);
});

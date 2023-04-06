import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import UserProvider, { UserContext } from "../providers/UserProvider";
import Login from "../routes/Auth/Login";

/**
 * Desired behavior:
 * "As a user, I want to be able to login to my account so that I can access my profile and other features of the application."
 * Acceptance criteria: "The login component should be rendered and accept user input via the login form. That input should be validated before sending to the server. If the user enters invalid credentials, an error message should be displayed. If the user enters valid credentials, they should be redirected to the home page."
 * Needed tests:
 * "The login component should be rendered in document.body (within <main> and the login form should be rendered inside <Login />."
 * "The login form should accept user input."
 * "The login form should redirect the user to the home page after logging in."
 * "The login form should display an error message if the user enters invalid credentials."
 * "The login form should utilize client-side and server-side validation to do that ^"
 * "The login form should prevent duplicate submissions while the user is waiting for a response from the server."
 */

// We need to mock Axios
jest.mock("axios");

const LoginComponent = () => {
    return (
        <>
            <BrowserRouter>
                <UserProvider>
                    <Login />
                </UserProvider>
            </BrowserRouter>
        </>
    );
};

/* Perform various tests on the Login component */
test("renders the login component", () => {
    // The Login component is nested within a BrowserRouter because it uses the useNavigate hook
    // to redirect the user to the home page after logging in. This could probably be mocked, but
    // I'm not sure how to do that yet.
    render(<LoginComponent />);
    // Check if the login component is rendered in document.body
    // We know the component will have "Remember me" in the contents
    expect(screen.getByText("Remember me")).toBeInTheDocument();

});

// Check if #loginForm renders inside <Login />
test("renders the login form in the component", () => {
    // Render the Login component
    render(<LoginComponent />);
    // Check if "Login" appears on the page; We know "Login" is loginForm's heading
    expect(screen.getByRole("form")).toBeInTheDocument();
});

// Check if the login form accepts user input
test("accepts user input", async () => {
    const user = userEvent.setup();

    // Prepare sample data to inset into the login form
    const email = "test@test.com";
    const password = "test123";

    render(<LoginComponent />);

    // Obtain the login form's input fields
    const emailField = screen.getByLabelText(/Username \/ Email/);
    const passwordField = screen.getByLabelText(/Password/);

    // Input the sample data into those fields using the userEvent library, asynchronously 
    await act(async () => {
        await user.type(emailField, email);
        await user.type(passwordField, password);
    });

    // Check if the input fields contain the sample data
    expect(emailField).toHaveValue(email);
    expect(passwordField).toHaveValue(password);
});

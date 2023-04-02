/* eslint testing-library/no-container: 0 */
/* eslint testing-library/no-node-access: 0 */
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserProvider, { UserContext } from '../providers/UserProvider';
import UserSettings from '../routes/UserSettings';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const user = { first_name: 'John', last_name: 'Doe', email: 'test@test.com', password: 'test' };
const updateUser = jest.fn();

// Mock the react-modal setAppElement function, also used in EditAvatarModal
jest.mock('react-modal', () => ({
    ...jest.requireActual('react-modal'),
    setAppElement: () => jest.fn()
}));

/**
 * This component is necessary for displaying the User's account-specific information, such as username,
 * first name, last name, email, and password. It also allows the user to edit their account information.
 * The user can also view a list of users they have blocked, and unblock them if they wish.
 * Scenario 1: User modifies account-specific information
 * Given that the user is on the Account Settings page
 * When the user clicks the Edit button next to the field they wish to edit
 * Then the input field should be enabled and the user can edit the field
 * Scenario 2: User saves account-specific information
 * Given that the user is on the Account Settings page
 * When the user clicks the Save button next to the field they wish to edit
 * Then the input field should be disabled and the user can no longer edit the field
 * but the new info will be stored in the database and visible to the user
 * Scenario 3: User deactivates account
 * Given that the user is on the Account Settings page
 * When the user clicks the Deactivate Account button
 * Then the user's account should be deactivated and they should be logged out
 * Scenario 4: User views blocked users
 * Given that the user is on the Account Settings page
 * When the user clicks the Blocked Users button
 * Then the user should be taken to the Blocked Users page
 */
describe('UserSettings', () => {
    it('renders the user settings page', () => {
        render(
            <UserProvider>
                <UserContext.Provider value={{ user, updateUser }}>
                    <UserSettings />
                </UserContext.Provider>
            </UserProvider>
        );

        expect(screen.getByText('Account Settings')).toBeInTheDocument();
    });

    it('starts with input fields disabled', () => {
        render(
            <UserProvider>
                <UserContext.Provider value={{ user, updateUser }}>
                    <UserSettings />
                </UserContext.Provider>
            </UserProvider>
        );

        // There will be multiple elements with the inputs' names due to the label containing a child with the same content,
        // so we need to use the getAll... to get one. The first one will label the Edit button, the second one will label the input.
        // Ideally figure out why it's doing that and alter the LabeledInput component to fix it.
        const firstNameInput = screen.getAllByLabelText('First Name')[1];
        const lastNameInput = screen.getAllByLabelText('Last Name')[1];
        const emailInput = screen.getAllByLabelText('Email')[1];
        const passwordInput = screen.getAllByLabelText('Password')[1];


        expect(firstNameInput).toBeDisabled();
        expect(lastNameInput).toBeDisabled();
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
    });

    it('enables input fields when edit button is clicked', async () => {
        render(
            <UserProvider>
                <UserContext.Provider value={{ user, updateUser }}>
                    <UserSettings />
                </UserContext.Provider>
            </UserProvider>
        );

        // We'll have to determine the appropriate Edit button to click
        // We know that the buttons will have a data-for={id} attribute, so we can use that to find the correct button
        const usernameInput = screen.getAllByLabelText('Username')[1];
        const editButton = screen.getByTestId(`edit-username`);

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            userEvent.click(editButton);
        });
        await waitFor(() => {
            expect(usernameInput).toBeEnabled();
        });
    });

    it("switches to Blocked Users tab when 'Blocked Users' is clicked", async () => {
        render(
            <UserProvider>
                <UserContext.Provider value={{ user, updateUser }}>
                    <UserSettings />
                </UserContext.Provider>
            </UserProvider>
        );

        const blockedUsersBtn = screen.getByText('Blocked Users');

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            userEvent.click(blockedUsersBtn);
        });

        expect(screen.getByText('Blocked Users')).toBeInTheDocument();
    });

    it("switches back to Account Settings screen when 'Account Settings' is clicked", async () => {
        render(
            <UserProvider>
                <UserContext.Provider value={{ user, updateUser }}>
                    <UserSettings />
                </UserContext.Provider>
            </UserProvider>
        );

        // Get button with name "blockedUsersBtn" and click it
        const blockedUsersBtn = screen.getByText('Blocked Users');
        const accountSettingsBtn = screen.getByText('Account Settings');

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await userEvent.click(blockedUsersBtn);
        }).then(() => {
            expect(screen.getByText('Blocked Users')).toBeInTheDocument();
        });
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await userEvent.click(accountSettingsBtn);
        }).then(() => {
            expect(screen.getByText('Account Settings')).toBeInTheDocument();
        });
    });

    it("responds to avatar Edit button click", async () => {
        const view = render(
            <UserProvider>
                <UserContext.Provider value={{ user, updateUser }}>
                    <UserSettings />
                </UserContext.Provider>
            </UserProvider>
        );

        const avatarEditBtn = screen.queryByTestId('edit-avatar');

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await userEvent.click(avatarEditBtn);
        }).then(() => {
            expect(view.container.querySelector('.ReactModalPortal')).toBeInTheDocument();
        });
    });

    // TODO: Test account deactivation

    // TODO: Test Edit Password button and modal

});

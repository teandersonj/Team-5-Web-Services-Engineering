import React from 'react';
import { render, screen } from '@testing-library/react';
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
});

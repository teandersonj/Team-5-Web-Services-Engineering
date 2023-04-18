/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import UserProvider, { UserContext } from "../providers/UserProvider";
import PlayerSearch from "../routes/PlayerSearch";

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const user = userEvent.setup();
const updateUser = jest.fn();

// Mock the react-modal setAppElement function, also used in EditAvatarModal
// Also mock the <Modal> element and just have it render its children
/* jest.mock('react-modal', () => ({
    ...jest.requireActual('react-modal'),
    setAppElement: () => jest.fn(),
    Modal: ({ children }) => (<div>{children}</div>),
})); */

const PlayerSearchComponent = () => {
    return (
        <UserProvider>
            <UserContext.Provider value={{ user, updateUser }}>
                <PlayerSearch />
            </UserContext.Provider>
        </UserProvider>
    );
};

/**
 * Desired behavior:
 * "As a user, I want to be able to search for other players so that I connect with other users I get along with and block those I don't."
 * Acceptance criteria:
 *  - The Player Search page renders correctly
 *  - The search bar accepts input
 *  - Typing input into the search bar generates results
 *  - The results render correctly
**/

// Test rendering of the page
describe('Player Search page', () => {
    it('renders correctly', () => {
        render(<PlayerSearchComponent />);
        expect(screen.getByText('Player Search')).toBeInTheDocument();
    });
});

// Search Bar Tests
describe('Search Bar', () => {
    it('renders correctly', () => {
        
        // Render the Component
        render(<PlayerSearchComponent />);

        // Obtain the search input field
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('accepts input', async () => {

        // Render the Component
        render(<PlayerSearchComponent />);

        // Obtain the search bar input field
        const searchField = screen.getByRole('textbox');

        // Input sample data into the field
        await act(async () => {
            await user.type(searchField, "User");
        });

        // Test that the search field has the correct value
        expect(searchField).toHaveValue("User");
    });

    it('renders results correctly after recieving input', async () => {

        // Render the Component
        render(<PlayerSearchComponent />);

        // Obtain the search bar input field & search button
        const searchField = screen.getByRole('textbox');
        const searchBtn = screen.queryByTestId('search-btn');

        // Input sample data into the field
        await act(async () => {
            await user.type(searchField, "Pixel");
        });

        // Test that the search field has the correct value
        expect(searchField).toHaveValue("Pixel");

        // Click the Search Button and check to see if results are displayed correctly
        await act(async () => {
            await userEvent.click(searchBtn);
        }).then(() => {
            expect(screen.getByText(/PixelatedNinja/)).toBeInTheDocument();
        });
    });

    it('displays the number of users returned', async () => {
        // Render the Component
        render(<PlayerSearchComponent />);
      
       // Check that component rendered correctly
        expect(screen.getByText('Player Search')).toBeInTheDocument();
      
        // Obtain the search bar input field
        const searchField = screen.getByTestId('searchInput');
      
        // Input sample data into the field
        await userEvent.type(searchField, 'Pixel');
      
        // Obtain the search button and click it
        const searchBtn = screen.getByTestId('searchBtn');
        await userEvent.click(searchBtn);
      
        // Test that the search field has the correct value
        expect(await screen.findByText(/1 users found/)).toBeInTheDocument();
    });
      

});

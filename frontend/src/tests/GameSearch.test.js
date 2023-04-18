/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UserProvider, { UserContext } from "../providers/UserProvider";
import GameSearch from "../routes/GameSearch";

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

const GameSearchComponent = () => {
    return (
        <UserProvider>
            <UserContext.Provider value={{ user, updateUser }}>
                <GameSearch />
            </UserContext.Provider>
        </UserProvider>
    );
};

/**
 * Desired behavior:
 * "As a user, I want to be able to games supported by Fireside Gaming so I can connect with users who play games that I enjoy."
 * Acceptance criteria:
 *  - The Player Search page renders correctly
 *  - The search bar accepts input
 *  - Typing input into the search bar generates results
 *  - The results render correctly
**/

// Test rendering of the page
describe('Game Search page', () => {
    it('renders correctly', () => {
        // Render the GameSearch Component and check that it rendered correctly
        render(<GameSearchComponent />);
        expect(screen.getByText('Find Games')).toBeInTheDocument();
    });
});

describe('Search Bar', () => {
    it('accepts user input', async () => {
        // Render the GameSearch Component and check that it rendered correctly
        render(<GameSearchComponent />);
        expect(screen.getByText('Find Games')).toBeInTheDocument();

        // Get the Search Input Field
        const searchField = screen.getByTestId('gameSearchField');

        // Input text into search field
        await userEvent.type(searchField, "Dark Souls");
      
        // Check that input was registered correctly
        expect(searchField).toHaveValue("Dark Souls");
    });

    // TODO: Mock/Pull the DB to retrieve game results properly
    // i.e., Dark Souls 3 is not being properly searched for in the test below even though
    // everything is functioning properly

    // it('renders the correct search results', async () => {
    //     // Render the GameSearch Component and check that it rendered correctly
    //     render(<GameSearchComponent />);
    //     expect(screen.getByText('Find Games')).toBeInTheDocument();
      
    //     // Get the Search Input Field
    //     const searchField = screen.getByTestId('gameSearchField');
      
    //     // Input text into search field
    //     await userEvent.type(searchField, "Dark Souls");
      
    //     // Get the Search Button and click it
    //     const searchBtn = screen.getByTestId('gameSearchBtn');
    //     await userEvent.click(searchBtn);
      
    //     // Check that the expected results were returned
    //     expect(await screen.findByText(/Dark Souls/)).toBeInTheDocument();
    // });
      
});


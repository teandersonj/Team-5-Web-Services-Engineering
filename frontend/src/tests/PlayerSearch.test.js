/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { act, render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import UserProvider, { UserContext } from "../providers/UserProvider";
import PlayerSearch from "../routes/PlayerSearch";

const sampleGames = [
    {
        "GameId": 1,
        "name": "League of Legends",
        "description": "League of Legends is a team-based game with over 140 champions to make epic plays with. Play now for free.",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/21779/header.jpg?t=1591083840",
    },
    {
        "GameId": 2,
        "name": "Dark Souls III",
        "description": "Dark Souls III is the latest chapter in the critically-acclaimed Dark Souls series. The game takes place in a dark fantasy universe, where players assume the role of a cursed undead character who begins a pilgrimage to discover the fate of their kind.",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg?t=1591083840",
    },
    {
        "GameId": 3,
        "name": "Star Wars: Battlefront II",
        "description": "Star Wars Battlefront II is a sequel to the 2015 reboot of the Star Wars Battlefront series. The game is a first- and third-person shooter that features a single-player campaign and multiplayer modes.",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/606800/header.jpg?t=1591083840",
    },
];

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

// Since PlayerSearch requires getNRandomGames as a stand-in for the games a user is currently playing, we need to mock that function
jest.mock('../services/GameInfoService', () => ({
    __esModule: true,
    // Have it return a sample game
    getNRandomGames: (n) => Promise.resolve([
        ...sampleGames
    ])
}));

// Our PlayerSearch component uses the getSearchResults function to get the results of a search query
// We can create some sample data to mock the results of a search query
const samplePlayers = [
    {
        "pk": 1,
        "avatar": "avatar3",
        "playstyle": "Casual",
        "currentStatus": "Online",
        "user": {
            "id": 1,
            "username": "PixelatedNinja",
            "first_name": "Pixelated",
            "last_name": "Ninja",
        },
        // Use some 
        "favoriteGames": [
            ...sampleGames
        ],
        "recentlyPlayedGames": [
            ...sampleGames
        ],
    },
];

// Mock our getSearchResults function, used in PlayerSearch.jsx
jest.mock('../routes/PlayerSearch', () => ({
    __esModule: true,
    ...jest.requireActual("../routes/PlayerSearch"),
    // Mock the setSearchResults to set the components state
    // getSearchResults: (searchTerm) => Promise.resolve([
}));

// Mock the axios library
jest.mock('axios');

const user = userEvent.setup();
const updateUser = jest.fn();

// mock the <Modal> element and just have it render its children
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
        act(() => {
            render(<PlayerSearchComponent />);
        });

        // Obtain the search input field
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('accepts input', async () => {

        // Render the Component
        act(() => {
            render(<PlayerSearchComponent />);
        });

        // Obtain the search bar input field
        const searchField = screen.getByRole('textbox');

        // Input sample data into the field
        await act(async () => {
            await user.type(searchField, "User");
        });

        // Test that the search field has the correct value
        expect(searchField).toHaveValue("User");
    });

/*     it('renders results correctly after receiving input', async () => {
        // Mock the axios get method to return the expected results
        axios.get.mockResolvedValue({ data: [samplePlayers] });

        // Render the component
        act(() => {
            render(<PlayerSearchComponent />);
        });

        // Get the search input and submit button
        const searchField = screen.getByRole('textbox');
        const submitButton = screen.getByTestId('searchBtn');

        // Set the search input value and submit the form
        await act(async () => {
            await user.type(searchField, "Pixel");
            await user.click(submitButton);
        });

        // Wait for the axios get method to resolve and for the state to update
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(searchField).toHaveValue("Pixel");
            expect(screen.getByText(/PixelatedNinja/)).toBeInTheDocument();
        });
    });

    it('displays the number of users returned', async () => {
        // Mock the axios get method to return the expected results
        axios.get.mockResolvedValue({ data: samplePlayers });

        // Render the Component
        render(<PlayerSearchComponent />);

        // Check that component rendered correctly
        expect(screen.getByText('Player Search')).toBeInTheDocument();

        // Get the search input and submit button
        const searchInput = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        // Set the search input value and submit the form
        await user.type(searchInput, "Pixel");
        await user.click(submitButton);

        expect(searchInput).toHaveValue("Pixel");

        await waitFor(() => {
            // Wait for the axios get method to resolve and for the state to update
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(screen.getByText('PixelatedNinja')).toBeInTheDocument();

            // Test that number of user returned is correct
            expect(screen.getByText(/1 users found/igm)).toBeInTheDocument();
        });

        // Test that number of user returned is correct
        // await expect(await screen.findByText(/1 users found/igm)).toBeInTheDocument();
    }); */
});

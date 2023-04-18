/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProvider, { UserContext } from "../providers/UserProvider";
import FriendsList from "../components/FriendsList";

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const updateUser = jest.fn();
// Simulate a user to populate our user context, namely need to give it a friendsList which has elements like:
const userContextValue = {
    
    friendsList: [
        {
            "pk": 4,
            "avatar": "avatar2",
            "playstyle": "Casual",
            "user": {
                "username": "PixelatedNinja",
                "first_name": "Pixel",
                "last_name": "Ninja"
            },
            "currentStatus": "Online"
        },
        {
            "pk": 5,
            "avatar": "avatar3",
            "playstyle": "Competitive",
            "user": {
                "username": "GamerGuy",
                "first_name": "Gamer",
                "last_name": "Girl"
            },
            "currentStatus": "Online"
        },
    ]
}

// Since friendsList requires getNRandomGames as a stand-in for the games a user is currently playing, we need to mock that function
jest.mock('../services/GameInfoService', () => ({
    __esModule: true,
    // Have it return a sample game
    getNRandomGames: (n) => Promise.resolve([
        {
            "GameId": 1,
            "name": "League of Legends",
            "description": "League of Legends is a team-based game with over 140 champions to make epic plays with. Play now for free.",
            "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/21779/header.jpg?t=1591083840",
        }
    ])
}));

// Also mock the <Modal> element and just have it render its children
/*
jest.mock('react-modal', () => ({
  ...jest.requireActual('react-modal'),
  setAppElement: () => jest.fn(),
  Modal: ({ children }) => (<div>{children}</div>),
}));
*/

const FriendListComponent = () => {
    return (
        <UserProvider>
            <UserContext.Provider value={{ user: userContextValue, updateUser }}>
                <FriendsList />
            </UserContext.Provider>
        </UserProvider>
    );
};

/** 
 * Desired behavior:
 * "As a user, I want to be able to easily display a list of my friends so that I can connect with active ones and play games with them."
 * 
 * Acceptance criteria:
 * - The Friends modal renders correctly
 * - The search bar accepts input
 * - The results render correctly
 * - The Friend Controls Render Correctly
 * - User can exit Friend Controls Successfully
**/

// Test Rendering of User Profile
describe('Friends List Component', () => {

    it('renders', () => {
        // Render Layout Component
        act(() => {
            render(<FriendListComponent />);
        });
        // Check if modal rendered properly
        expect(screen.getByText('In Party')).toBeInTheDocument();
    });

    it('displays all categories', async () => {
        // Render Layout Component
        act(() => {
            render(<FriendListComponent />);
        });
        // Check if all categories rendered correctly
        expect(screen.getByText(/In Party/)).toBeInTheDocument();
        expect(screen.getByText(/In Game/)).toBeInTheDocument();
        expect(screen.getByText(/Offline/)).toBeInTheDocument();
        expect(screen.getAllByText(/Online/m)[0]).toBeInTheDocument()
    });

    it('accepts input in the search bar', async () => {
        const event = userEvent.setup();
        // Render Layout Component
        act(() => {
            render(<FriendListComponent />);
        });

        // Check if search bar rendered properly
        const friendsListSearch = screen.getByTestId('friendSearchBar');
        expect(friendsListSearch).toBeInTheDocument();

        // Input text into search bar and check if it is working as intended
        await act(async () => {
            await event.type(friendsListSearch, "Pixel");
        });
        expect(friendsListSearch).toHaveValue("Pixel");
    });

    it('renders the correct search results', async () => {
        const event = userEvent.setup();
        // Render Layout Component
        act(() => {
            render(<FriendListComponent />);
        });

        // Check if search bar rendered properly
        const friendsListSearch = screen.getByTestId('friendSearchBar');

        expect(friendsListSearch).toBeInTheDocument();
        // Input text into search bar and check if it is working as intended
        await act(async () => {
            await event.type(friendsListSearch, "Pixel");
        });

        // Click the search button and check if expected results are displayed
        const searchBtn = screen.getByTestId('friendSearchBtn');
        await act(async () => {
            await userEvent.click(searchBtn);
        });
        
        expect(screen.getByText('PixelatedNinja')).toBeInTheDocument();
    });

    it('clears the search results when the clear button is clicked', async () => {
        const event = userEvent.setup();
        // Render FriendsList Component
        // Get access to the nodes in FriendsList
        let container;
        act(() => {
            return render(<FriendListComponent />);
        }).then(({ containerNode }) => {
            container = containerNode;
        });

        // Wait for the component to render
        await waitFor(() => {
            // Check if something we know will be there is there
            expect(screen.getByText('In Party')).toBeInTheDocument();
        });

        // Check if search bar rendered properly
        // For some reason, screen.getByTestId isn't working so we can test the rendered container directly for the DOM element
        // const friendsListSearch = container.querySelector("input[data-testid='friendSearchBar']"); // eslint-disable-line
        // With adding act over the render function, this is no longer necessary
        const friendsListSearch = screen.getByTestId('friendSearchBar');

        // Input text into search bar and check if it is working as intended
        await act(async () => {
            await event.type(friendsListSearch, "Pixel");
        });

        // Check that input was registered correctly
        expect(friendsListSearch).toHaveValue("Pixel");

        // Click the search button and check if expected results are displayed
        const searchBtn = screen.getByTestId("friendSearchBtn");

        await act(async () => {
            await userEvent.click(searchBtn);
        });

        expect(screen.getByText(/PixelatedNinja/im)).toBeInTheDocument();

        // Clear the input field & check that it was cleared successfully
        await act(async () => {
            await event.click(screen.queryByTestId('clearBtn'));
        }).then(() => {
            expect(friendsListSearch).not.toHaveValue(/Pixel/);
        });
    });

    it('can successfully open the friend control modal', async () => {
        // Render FriendsList Component
        render(<FriendListComponent />);
      
        // Wait for the component to render
        await waitFor(() => {
          // Check if something we know will be there is there
          expect(screen.getByText('In Party')).toBeInTheDocument();
        });
      
        // Check if search bar rendered properly
        const friendsListSearch = screen.getByTestId('friendSearchBar');
      
        // Input text into search bar and check if it is working as intended
        await userEvent.type(friendsListSearch, "Pixel");
      
        // Check that input was registered correctly
        expect(friendsListSearch).toHaveValue("Pixel");
      
        // Click the search button and check if expected results are displayed
        const searchBtn = screen.getByTestId("friendSearchBtn");
      
        await userEvent.click(searchBtn);
      
        expect(screen.getByText(/PixelatedNinja/im)).toBeInTheDocument();
      
        // Get Friend Control Modal Button
        const friendControlBtn = screen.getByTestId("friendControlBtn");
      
        // Click the Friend Control Modal Button
        await userEvent.click(friendControlBtn);
      
        // Check if modal rendered correctly
        expect(await screen.findByText('Friend Controls')).toBeInTheDocument();
      });

      it('can close the Friend Control Modal after opening it', async () => {
        // Render FriendsList Component
        render(<FriendListComponent />);
      
        // Wait for the component to render
        await waitFor(() => {
          // Check if something we know will be there is there
          expect(screen.getByText('In Party')).toBeInTheDocument();
        });
      
        // Check if search bar rendered properly
        const friendsListSearch = screen.getByTestId('friendSearchBar');
      
        // Input text into search bar and check if it is working as intended
        await userEvent.type(friendsListSearch, "Pixel");
      
        // Check that input was registered correctly
        expect(friendsListSearch).toHaveValue("Pixel");
      
        // Click the search button and check if expected results are displayed
        const searchBtn = screen.getByTestId("friendSearchBtn");
      
        await userEvent.click(searchBtn);
      
        expect(screen.getByText(/PixelatedNinja/im)).toBeInTheDocument();
      
        // Get Friend Control Modal Button
        const friendControlBtn = screen.getByTestId("friendControlBtn");
      
        // Click the Friend Control Modal Button
        await userEvent.click(friendControlBtn);
      
        // Check if modal rendered correctly
        expect(await screen.findByText('Friend Controls')).toBeInTheDocument();
      
        // Get Friend Control Modal Close Button and Click It
        const closeBtn = screen.getByTestId("closeModalBtn");
      
        await userEvent.click(closeBtn);
      
        // Check to make sure modal is closed
        await waitFor(() => {
          expect(screen.queryByText('Friend Controls')).not.toBeInTheDocument();
        });
      });
});

import GameCard from "../components/GameCard";
import React from "react";
import { act, screen, render } from "@testing-library/react";
// import { shallow } from "enzyme";

describe("GameCard", () => {
    it("renders correctly", () => {
        render(<GameCard />);
        expect(screen.getByText(/No name available/)).toBeInTheDocument();
    });

    it("renders correctly with game", () => {
        const game = {
            name: "Dark Souls",
            GameId: 1,
            description: "A game about dying",
            image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg",
        }
        render(<GameCard game={game} />);
        expect(screen.getByText(/Dark Souls/)).toBeInTheDocument();
    });

    it("renders correctly with game and withUsers prop", () => {
        const game = {
            name: "Dark Souls",
            GameId: 1,
            description: "A game about dying",
            image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg",
        };

        // Fill 'players' initial state with some predictable users
        const players = [
            {
                "pk": 1,
                "avatar": "avatar2",
                "user": {
                    "username": "testuser1",
                },
                "playstyle": "Casual",
            },
            {
                "pk": 2,
                "avatar": "avatar1",
                "user": {
                    "username": "testuser2",
                },
                "playstyle": "Competitive",
            },
        ];

        // Mock the fetch call to return some predictable users
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve([...players])
        }));

        render(<GameCard game={game} withPlayers={true} />);
        expect(screen.getByText(/Dark Souls/)).toBeInTheDocument();
        expect(screen.getByText(/Active Players/)).toBeInTheDocument();
    });
});

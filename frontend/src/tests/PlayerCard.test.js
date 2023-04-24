/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import PlayerCard from "../components/PlayerCard";
import { act, findByText, screen, render } from "@testing-library/react";
import React from "react";

describe("PlayerCard", () => {
    it("Renders without props", () => {
        const { container } = render(<PlayerCard />);
        // Get the username text input
        expect(container.querySelector("#username")).toHaveValue("Unset");
    });

    it("Renders with player", () => {
        const player = {
            pk: 1,
            avatar: "avatar1",
            user: {
                username: "testuser1",
            },
            playstyle: "Casual",
        };
        const { container } = render(<PlayerCard player={player} />);
        expect(container.querySelector("#username")).toHaveValue("testuser1");
    });

    it("Renders with withPlayerStatus prop", async () => {
        const player = {
            pk: 1,
            avatar: "avatar1",
            user: {
                username: "testuser1",
            },
            playstyle: "Casual",
            currentStatus: "Online"
        };
        const { container, findByText } = render(<PlayerCard player={player} withPlayerStatus={true} />);
        expect(container.querySelector("#username")).toHaveValue("testuser1");
        expect(await findByText(/Online/)).toBeInTheDocument();
    });

    it("Renders with large size prop", () => {
        const player = {
            pk: 1,
            avatar: "avatar1",
            user: {
                username: "testuser1",
                first_name: "Test",
                last_name: "User",
            },
            playstyle: "Casual",
        };
        const { container } = render(<PlayerCard player={player} size="large" />);
        expect(container.querySelector("#username")).toHaveValue("testuser1");
        // expect(screen.getByText(/Casual/)).toBeInTheDocument();
        // Expect the first and last name inputs to be there
        expect(container.querySelector("#first_name")).toHaveValue("Test");
        expect(container.querySelector("#last_name")).toHaveValue("User");
    });

    it("Renders with withPlayerStatus and large size prop", async () => {
        const player = {
            pk: 1,
            avatar: "avatar1",
            user: {
                username: "testuser1",
                first_name: "Test",
                last_name: "User",
            },
            playstyle: "Casual",
            currentStatus: "Online"
        };
        const { container, findByText } = render(<PlayerCard player={player} withPlayerStatus={true} size="large" />);
        expect(container.querySelector("#username")).toHaveValue("testuser1");
        expect(await findByText(/Online/)).toBeInTheDocument();
        // Expect the first and last name inputs to be there
        expect(container.querySelector("#first_name")).toHaveValue("Test");
        expect(container.querySelector("#last_name")).toHaveValue("User");
    });

    it("Renders with 'small' size prop", () => {
        const player = {
            pk: 1,
            avatar: "avatar1",
            user: {
                username: "testuser1",
                first_name: "Test",
                last_name: "User",
            },
            playstyle: "Casual",
        };
        const { container } = render(<PlayerCard player={player} size="small" />);
        expect(container.querySelector("#username")).toHaveValue("testuser1");
        // Expect the first and last name inputs to not be there
        expect(container.querySelector("#first_name")).toBeNull();
        expect(container.querySelector("#last_name")).toBeNull();
    });
});

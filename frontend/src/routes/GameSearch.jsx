import { useState } from "react";
import LabeledInput from "../components/LabeledInput";

import GameCard from "../components/GameCard";

export default function GameSearch(props) {
    const [searchState, setSearchState] = useState({
        query: "",
        filterRules: {},
        results: [],
        errors: {}
    });

    const getSearchResults = (e) => {
        alert("Searching for games with name " + searchState.query);
        e.preventDefault();
        // TODO: Make this actually search the database
        fetch("/dummyData.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Authorization": "Bearer " + localStorage.getItem("token")
            },
            params: {
                // this'll be passed as a query string to the server
                search: encodeURIComponent(searchState.query)
            }
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    // let searchResults = [];
                    // TODO: Filter the results based on the filter rules
                    // Select only the results that match the query
                    // Right now, it just filters based on the player's username
                    // If the query is empty, return all results
                    if (searchState.query !== "" && data.games) {
                        const res = data.games.filter((game) => {
                            return game.name.toLowerCase().includes(searchState.query.toLowerCase());
                        });
                        setSearchState((prev) => ({ ...prev, results: res }));
                    }
                });
            } else {
                res.json().then((data) => {
                    setSearchState((prev) => ({ ...prev, errors: data.errors }));
                });
            }
        });
    };
    return (
        <>
            <h1 className="pageHeading centerText">Find Games</h1>
            <p>Use this page to discover new games, and see who's playing them.</p>
            <hr className="width-100" />
            <div className="flexDirectionRow">
                {/* Search Bar */}
                <LabeledInput type="text" id="search" label="" placeholder="Search for a game..." defaultValue={searchState.search} containerStyle={{ flexGrow: 1 }} orientation="horizontal" onChange={(e) => setSearchState((prev) => ({ ...prev, query: e.target.value }))} />
                {/* Search Button */}
                <button onClick={(e) => getSearchResults(e)}>Search</button>
            </div>
            <div className="flexDirectionColumn" style={{ alignSelf: "stretch" }}>
                {/* Main Games Container */}
                <div className="flexDirectionRow justifyContentSpaceBetween" style={{ width: "75%", margin: "0 auto" }}>
                    {/* TODO: Fix this so the container doesn't render if not needed */}
                    {searchState.results?.length > 0 && (
                        <>
                            <div>Search Results:</div>
                            <div>{searchState.results?.length || 0} games found.</div>
                        </>
                    )}
                </div>
                <div className="flexDirectionColumn flexWrap">
                    {searchState.results?.map((game) => (
                        // TODO: Extract styling for GameCard and allow it to vary for GameSearch and when it's used in profiles
                        <GameCard key={game.GameId} game={game} withPlayers={true} />
                    )) || <div>No games found.</div>}
                </div>
            </div>
        </>
    );
}

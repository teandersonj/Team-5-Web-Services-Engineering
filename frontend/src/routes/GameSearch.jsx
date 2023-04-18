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
                        const res = data?.games?.filter((game) => {
                            return game.name.toLowerCase().includes(searchState.query.toLowerCase());
                        });
                        setSearchState((prev) => ({ ...prev, results: res || [] }));
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
            <p>On this page, you can search for games supported by Fireside Gaming. Here, you can learn about the statistics of various games as well as the players who enjoys each one. To find your next gaming adventure, type in the search bar provided below.</p>
            <hr className="width-100" />
            <div className="flexDirectionRow width-100">
                {/* Search Bar */}
                <LabeledInput type="text" id="search" label="" placeholder="Search for a game..." defaultValue={searchState.search} containerStyle={{ flexGrow: 1 }} orientation="horizontal" onChange={(e) => setSearchState((prev) => ({ ...prev, query: e.target.value }))} />
                {/* Search Buttons */}
                <div>
                    <button className="roundedBlueBtn" onClick={(e) => getSearchResults(e)}>Search</button>
                    <button className="roundedBlueBtn">Filter<img className="btnIcon" alt="Filter" src="/img/icons/filterIcon.png" /></button>
                </div>
            </div>
            <div className="flexDirectionColumn" style={{ alignSelf: "stretch" }}>
                {searchState.results?.length > 0 && (
                    <div className="flexDirectionRow justifyContentSpaceBetween">
                        <>
                            <div><strong>Results</strong></div>
                            <div>{searchState.results?.length > 0 ? (`Displaying ${searchState.results.length} games`) : `0 results found.`}</div>
                        </>
                    </div>
                )}
                <div className="flexDirectionColumn flexWrap flexGrow-1">
                    {searchState.results?.map((game) => (
                        <GameCard key={game.GameId} className="flexGrow-1" game={game} withPlayers={true} />
                    )) || <div>No games found.</div>}
                </div>
            </div>
        </>
    );
}

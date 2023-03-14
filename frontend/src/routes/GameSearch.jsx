import { useState } from "react";
import LabeledInput from "../components/LabeledInput";

import GameCard from "../components/GameCard";

export default function GameSearch(props) {
    const [searchState, setSearchState] = useState({
        search: "",
        results: [],
        errors: {}
    });

    const getSearchResults = (e) => {
        e.preventDefault();
        fetch("/dummyData.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            params: {
                // Encode the search string so it can be sent in the URL
                search: encodeURIComponent(searchState.search)
            }
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSearchState((prev) => ({ ...prev, results: data }));
                });
            } else {
                res.json().then((data) => {
                    setSearchState((prev) => ({ ...prev, errors: data }));
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
                <LabeledInput type="text" id="search" label="" defaultValue={searchState.search} containerStyle={{ flexGrow: 1 }} orientation="horizontal" onChange={(e) => setSearchState((prev) => ({ ...prev, search: e.target.value }))} />
                {/* Search Button */}
                <button onClick={(e) => getSearchResults(e)}>Search</button>
            </div>
            <div className="flexDirectionColumn" style={{ alignSelf: "stretch" }}>
                {/* Main Games Container */}
                <div className="flexDirectionRow justifyContentSpaceBetween" style={{ width: "75%", margin: "0 auto" }}>
                    {/* TODO: Fix this so the container doesn't render if not needed */}
                    {searchState.results?.games?.length > 0 && (<><div>Search Results:</div>
                    <div>{searchState.results?.games.length || 0} games found.</div></>)}
                </div>
                <div className="flexDirectionColumn flexWrap">
                    {searchState.results?.games?.map((game) => (
                        // TODO: Extract styling for GameCard and allow it to vary for GameSearch and when it's used in profiles
                        <GameCard key={game.GameId} game={game} withPlayers={true} />
                    )) || <div>No games found.</div>}
                </div>
            </div>
        </>
    );
}

import { useState } from "react";
import axios from "axios";
import LabeledInput from "../components/LabeledInput";
import GameCard from "../components/GameCard";

export default function GameSearch(props) {
    const [searchState, setSearchState] = useState({
        query: "",
        // filterRules: {},
        filter: "title",
        searchActive: false, // Whether or not the user has clicked the search button
        results: [],
        errors: {}
    });

    const changeFilter = (e) => {
        e.preventDefault();
        setSearchState((prev) => ({
            ...prev,
            filter: prev.filter === "title" ? "genre" : "title"
        }));
    };

    const getSearchResults = async (e) => {
        e.preventDefault();
        // Clear any previous errors
        setSearchState((prev) => ({
            ...prev,
            searchActive: false,
            errors: {}
        }));

        const { query, filter } = searchState;
        const url = filter === "title" ? `/search/by/title/${query}` : `/search/by/genre/${query}`;
        await axios.get(`${process.env.REACT_APP_GAMEINFO_API_URL}${url}`).then((res) => {
            console.log(res.data)
            setSearchState((prev) => ({
                ...prev,
                searchActive: true,
                results: res.data
            }));
        }).catch((err) => {
            setSearchState((prev) => ({
                ...prev,
                searchActive: true,
                errors: err
            }));
        });
    };

    return (
        <>
            <h1 className="pageHeading centerText">Find Games</h1>
            <p>On this page, you can search for games supported by Fireside Gaming. Here, you can learn about the statistics of various games as well as the players who enjoys each one. To find your next gaming adventure, type in the search bar provided below.</p>
            <hr className="width-100" />
            <div className="flexDirectionRow width-100">
                {/* Search Bar */}
                <LabeledInput type="text" id="search" data-testid="gameSearchField" label="" placeholder={searchState.filter === "title" ? "Search for a game based on title..." : "Search for a game based on genre..."} defaultValue={searchState.search} containerStyle={{ flexGrow: 1 }} orientation="horizontal" onChange={(e) => setSearchState((prev) => ({ ...prev, query: e.target.value }))} />
                {/* Search Buttons */}
                <div>
                    <button className="roundedBlueBtn" data-testid="gameSearchBtn" onClick={(e) => getSearchResults(e)}>Search</button>
                    <button className="roundedBlueBtn" onClick={e => changeFilter(e)}>{searchState.filter === "title" ? "By Title" : "By Genre"} <img className="btnIcon" alt="Filter" src="/img/icons/filterIcon.png" /></button>
                </div>
            </div>
            <div className="flexDirectionColumn" style={{ alignSelf: "stretch" }}>
                {searchState.searchActive && (
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

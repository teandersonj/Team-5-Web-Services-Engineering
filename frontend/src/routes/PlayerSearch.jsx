import { useContext, useEffect, useState } from 'react';

import Avatar from '../components/Avatar';
import LabeledInput from '../components/LabeledInput';
import PlayerPlaystyleDisplay from '../components/PlayerPlaystyleDisplay';
import PlayerStatusDisplay from '../components/PlayerStatusDisplay';

/**
 * Represents the user/player search page, allowing a user to search for players based on username or other criteria.
 * @param {*} props 
 * @returns {JSX.Element} <PlayerSearch />
 */
export default function PlayerSearch(props) {
    const [searchState, setSearchState] = useState({
        query: "",
        filterRules: {},
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
                // this'll be passed as a query string to the server
                search: encodeURIComponent(searchState.query)
            }
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSearchState((prev) => ({ ...prev, results: data.users }));
                });
            } else {
                res.json().then((data) => {
                    setSearchState((prev) => ({ ...prev, errors: data.users }));
                });
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchState((prev) => ({ ...prev, query: e.target.value }));
    };

    // These styles are used to style the individual search results
    // Could be extracted to the global CSS file somehow?
    const rowStyle = {
        width: "100%",
        margin: "15px 0px",
        padding: "1em",
        border: "1px solid var(--color-dark-gray)",
        backgroundColor: "#3C3C3C",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.50) 3px 3px 8px",
    };

    // These styles are used to style the players' favorite games
    const imgProps = {
        width: "90px",
        height: "135px",
        margin: "0em 0.5em",
        boxShadow: "rgba(0, 0, 0, 0.25) 3px 3px 5px",
    };

    const playerColumn = {
        marginLeft: "24px",
        alignItems: "baseline",
    };
    
    const playerDisplayName = {
        fontWeight: "600",
        fontSize: "26px",
        textShadow: "rgba(0, 0, 0, 0.25) 3px 3px 5px",
    };

    const gamesColumn = {
        margin: "0em 2em",
        top: "-10px",
        position: "relative",
    }

    return (
        <>
            <h1 className="pageHeading centerText">Player Search</h1>
            <p>On this page, you can find other users who use Fireside Gaming. Users who we think you might get along with are highlighted in yellow with a star next to there name. If you find someone you enjoy gaming with, send them a friend request by clicking the “Add Friend” button under their username.</p>
            <hr className="width-100" />
            <div className="flexDirectionRow width-100">
                <LabeledInput containerClassName="flexGrow-1" type="text" id="search" name="search" placeholder="Type username here..." onChange={handleSearchChange} />
                <div>
                    <button className="roundedBlueBtn" onClick={(e) => getSearchResults(e)}>Search</button>
                    <button className="roundedBlueBtn">Filter<img className="btnIcon" src="/img/icons/filterIcon.png"/></button>
                </div>
            </div>
            <div className="flexDirectionColumn width-100">
                {searchState.results && searchState.results.length > 0 && (
                    <>
                        <div>Search Results:</div>
                        <div>{searchState.results.length || 0} users found.</div>
                        {searchState.results.map((player) => (
                            <div className="flexDirectionRow" style={{ ...rowStyle }}>
                                <Avatar avatar={player.avatar} playerStatus={player.currentStatus} size="large" />
                                <div className="flexDirectionColumn" style={{...playerColumn}}>
                                    <div style={{...playerDisplayName}}>{player.username}</div>
                                    <PlayerStatusDisplay status={player.currentStatus} />
                                    <PlayerPlaystyleDisplay playstyle={player.playstyle} />
                                    <button className="longRoundedBlueBtn">Add Friend</button>
                                    <button className='longRoundedRedBtn'>Block User</button>
                                </div>
                                <div className="flexDirectionRow justifyContentCenter flexGrow-1">
                                    <div className="flexDirectionColumn" style={{ ...gamesColumn}}>
                                        <div className="pageHeading centerText" style={{ fontSize: "1.25em" }}>Favorite Games</div>
                                        <div className="flexDirectionRow">
                                            {player.favoriteGames?.map((game) => (
                                                <div className="flexDirectionColumn">
                                                    <img src={game.image} style={{...imgProps}} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flexDirectionColumn" style={{...gamesColumn}}>
                                        <div className="pageHeading centerText" style={{ fontSize: "1.25em" }}>Recent Games</div>
                                        <div className="flexDirectionRow">
                                            {player.recentGames?.map((game) => (
                                                <div className="flexDirectionColumn">
                                                    <img src={game.image} style={{...imgProps}} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

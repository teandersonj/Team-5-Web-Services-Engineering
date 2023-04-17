/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* Only disabling these for now we're awaiting changes */

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { getNRandomGames } from '../services/GameInfoService';
import axios from 'axios';

import Avatar from '../components/Avatar';
import LabeledInput from '../components/LabeledInput';
import PlayerPlaystyleDisplay from '../components/PlayerPlaystyleDisplay';
import PlayerStatusDisplay from '../components/PlayerStatusDisplay';

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
};

const statuses = ["Online", "In-Game", "Offline"];

/**
 * Represents the user/player search page, allowing a user to search for players based on username or other criteria.
 * @param {*} props 
 * @returns {JSX.Element} <PlayerSearch />
 */
export default function PlayerSearch(props) {
    const { user, updateUser, addFriend: handleAddFriend, removeFriend: handleRemoveFriend } = useContext(UserContext);
    const [searchState, setSearchState] = useState({
        query: "",
        filterRules: {},
        results: [],
        errors: {}
    });

    const getSearchResults = async (e) => {
        e.preventDefault();
        if (searchState.query === '' || searchState.query === undefined) {
            return;
        }
        await axios.get("/api/players").then(async (res) => {
            const { data } = res;
            // We have access to all the players here
            let searchResults = [];
            // TODO: Filter the results based on the filter rules
            // Select only the results that match the query
            // Right now, it just filters based on the player's username
            if (data?.length > 0) {
                // Output users matching query, but exclude the current user
                searchResults = data.filter((player) => player.user.username !== user.username && player.user.username.toLowerCase().includes(searchState.query.toLowerCase()));
                // Add a random status to each player until we have it accounted for on backend
                // Also add some favorite and recentlyPlayedGames provided by dummy data via getNRandomGames
                // TODO: Remove this once we have the backend implemented
                const randFavGames = await getNRandomGames(2);
                const randRecentGames = await getNRandomGames(2);
                searchResults = searchResults.map((player) => {
                    return {
                        ...player,
                        currentStatus: statuses[Math.floor(Math.random() * statuses.length)],
                        favoriteGames: randFavGames,
                        recentlyPlayedGames: randRecentGames
                    };
                });
                // TODO: Apply random favorite and recent games to each player
                setSearchState((prev) => ({ ...prev, results: searchResults }));
            }
        }).catch((err) => {
            setSearchState((prev) => ({ ...prev, errors: JSON.stringify(err) }));
        });
    };

    const handleSearchChange = (e) => {
        setSearchState((prev) => ({ ...prev, query: e.target.value }));
    };

    const handleBlockFriend = async (e, targetFriend) => {
        e.preventDefault();
    };

    return (
        <>
            <h1 className="pageHeading centerText">Player Search</h1>
            <p>On this page, you can find other users who use Fireside Gaming. Users who we think you might get along with are highlighted in yellow with a star next to there name. If you find someone you enjoy gaming with, send them a friend request by clicking the “Add Friend” button under their username.</p>
            <hr className="width-100" />
            <div className="flexDirectionRow width-100">
                <LabeledInput containerClassName="flexGrow-1" type="text" id="search" name="search" placeholder="Type username here..." onChange={handleSearchChange} data-testid="search-btn" />
                <div>
                    <button className="roundedBlueBtn" onClick={(e) => getSearchResults(e)}>Search</button>
                    <button className="roundedBlueBtn">Filter<img className="btnIcon" src="/img/icons/filterIcon.png"/></button>
                </div>
            </div>
            <div className="flexDirectionColumn width-100">
                <div>Search Results:</div>
                <div>{searchState.results?.length || 0} users found.</div>
                {searchState.results && (
                    <>
                        {searchState.results?.length > 0 && searchState.results.map((player) => (
                            <div key={player.user.username} className="flexDirectionRow" style={{ ...rowStyle }}>
                                <Avatar avatar={player.AvatarName} playerStatus={player.currentStatus} size="large" />
                                <div className="flexDirectionColumn" style={{...playerColumn}}>
                                    <div style={{...playerDisplayName}}>{player.user.username}</div>
                                    <PlayerStatusDisplay status={player.currentStatus} />
                                    <PlayerPlaystyleDisplay playstyle={player.Playstyle} />
                                    {/* Depdnding whether this user is a friend we show Remove Friend or Add Friend */}
                                    {user.friendsList?.includes?.((friend) => friend.pk === player.pk) ? (
                                        <button className="longRoundedRedBtn" onClick={(e) => handleRemoveFriend(e, player.pk)}>Remove Friend</button>
                                    ) : (
                                        <button className="longRoundedBlueBtn" onClick={(e) => handleAddFriend(e, player.pk)}>Add Friend</button>
                                    )}
                                    <button className='longRoundedRedBtn' onClick={(e) => handleBlockFriend(e, player.pk)}>Block User</button>
                                </div>
                                <div className="flexDirectionRow justifyContentCenter flexGrow-1">
                                    <div className="flexDirectionColumn" style={{ ...gamesColumn}}>
                                        <div className="pageHeading centerText" style={{ fontSize: "1.25em" }}>Favorite Games</div>
                                        <div className="flexDirectionRow">
                                            {player.favoriteGames?.map?.((game) => (
                                                <div className="flexDirectionColumn">
                                                    <img src={game.image} style={{...imgProps}} />
                                                </div>
                                            )) || []}
                                        </div>
                                    </div>
                                    <div className="flexDirectionColumn" style={{...gamesColumn}}>
                                        <div className="pageHeading centerText" style={{ fontSize: "1.25em" }}>Recent Games</div>
                                        <div className="flexDirectionRow">
                                            {player.recentlyPlayedGames?.map?.((game) => (
                                                <div className="flexDirectionColumn">
                                                    <img src={game.image} style={{...imgProps}} />
                                                </div>
                                            )) || []}
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

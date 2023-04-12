/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

import Avatar from '../components/Avatar';
import LabeledInput from '../components/LabeledInput';
import PlayerPlaystyleDisplay from '../components/PlayerPlaystyleDisplay';
import PlayerStatusDisplay from '../components/PlayerStatusDisplay';

const friendsHeadingStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '0.5rem 0',
};

const friendsBodyHeadingStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderBottom: '1px solid var(--color-gold)',
};

// Style the add friend and friend request buttons
const friendsControlsStyle = {
    padding: '0.5rem',
    fontSize: '0.5rem'
};

const statusDisplayStyle = {
    maxHeight: '2rem', padding: '0.5rem 1.2rem', fontSize: '1rem', maxWidth: 'fit-content'
};

const overrideAvatarContainerStyle = {
    width: '5rem',
    height: '5rem',
    marginRight: '0.5rem'
};

let gamesList = [];

const FriendsList = (props) => {
    const { user, updateUser } = useContext(UserContext);
    const friendsList = user?.friendsList || [];
    const [party, setParty] = useState({});
    const [search, setSearch] = useState('');
    const [filteredFriends, setFilteredFriends] = useState(friendsList);

    // TODO: Need a repository of the supported games that users can add to their favorites
    // Right now it's just a dummy list held in the user's context
    const gamesList = Object.values(user.favoriteGames);

    const handleSearch = (e) => {
        // TODO: Get results sorted by the recommendation algorithm from server
        const newFilteredFriends = Object.values(friendsList).filter(friend => {
            return search !== '' ? friend.username?.toLowerCase().includes(search.toLowerCase()) : friendsList;
        });
        setFilteredFriends(newFilteredFriends);
    };

    const handleFilter = (e) => {
        e.preventDefault();
        // Filter the friends list based on the search state
    };
        
    return (
        <div className="friends-list">
            <div className="friends-list-header">
                <div className="flexDirectionRow">
                    <div>
                        <Avatar avatar={user.avatar} containerStyle={overrideAvatarContainerStyle} />
                    </div>
                    <div className="flexDirectionColumn">
                        <div><strong>{user.username}</strong></div>
                        <PlayerStatusDisplay status={user.currentStatus} overrideStyle={statusDisplayStyle} />
                    </div>
                </div>
                <div className="flexDirectionRow">
                    <LabeledInput label="" placeholder="Type username here..." id="search" name="search" value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="roundedBlueBtn" onClick={e => handleSearch(e)}>Search</button>
                    <button className="roundedBlueBtn" onClick={e => handleFilter(e)}>Filter</button>
                </div>
                <div className="flexDirectionRow justifyContentSpaceBetween" style={friendsHeadingStyle}>
                    <div className="flexDirectionColumn">FRIENDS</div>
                    <div className="flexDirectionRow">
                        <button className="roundedGrayBtn" style={friendsControlsStyle}>!</button>
                        <button className="roundedBlueBtn" style={friendsControlsStyle}>+</button>
                    </div>
                </div>
            </div>
            <div className="friends-list-body">
                <div className="flexDirectionColumn">
                    {/* If the user has a filled party show the Party section and populate */}
                    <div style={friendsBodyHeadingStyle}>In Party</div>
                    {user.currentParty.members?.length > 0 ? (
                        <>
                            <div className="flexDirectionRow">
                                <GameAndPlayerCard friend={user.currentParty.members[0]} game={user.currentParty.game} />
                            </div>
                            {/* If the user has more than one friend in their party show the rest of the party, but without the game image in front */}
                            {user.currentParty.members?.length > 1 && (
                                <div className="flexDirectionRow">
                                    {user.currentParty.members.slice(1).map((friend, index) => (
                                        <FriendEntry friend={friend} key={index} />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="centerText">Not in a party</div>
                    )}
                </div>
                <div className="flexDirectionColumn">
                    {/* If the user has a filled party show the Party section and populate */}
                    <div style={friendsBodyHeadingStyle}>In Game</div>
                    {filteredFriends.filter(friend => friend.currentStatus === 'In-Game').length > 0 ? (
                        <>
                            {/* If any of the friends have the status In-Game */}
                            {friendsList.filter(friend => friend.currentStatus === 'In-Game').map((friend, index) => (
                                <div key={friend.username} className="flexDirectionRow">
                                    {/* Generate a random int within range of 0..gamesList.length */}
                                    <GameAndPlayerCard friend={friend} game={gamesList[Math.floor(Math.random() * gamesList.length)]} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="centerText">No friends in game</div>
                    )}
                </div>
                <div className="flexDirectionColumn">
                    {/* Display friends with "Online" status */}
                    <div style={friendsBodyHeadingStyle}>Online</div>
                    {filteredFriends?.filter(friend => friend.currentStatus === 'Online').length > 0 ? (
                        <>
                            {filteredFriends?.filter(friend => friend.currentStatus === 'Online').map((friend, index) => (
                                <div key={friend.username} className="flexDirectionRow">
                                    <FriendEntry friend={friend} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="centerText">No friends online</div>
                    )}
                </div>
                <div className="flexDirectionColumn">
                    {/* Display friends with "Offline" status */}
                    <div style={friendsBodyHeadingStyle}>Offline</div>
                    {filteredFriends?.filter(friend => friend.currentStatus === 'Offline').length > 0 ? (
                        <>
                            {filteredFriends?.filter(friend => friend.currentStatus === 'Offline').map((friend, index) => (
                                <div key={friend.username} className="flexDirectionRow">
                                    <FriendEntry friend={friend} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="centerText">No friends offline</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FriendEntry = (props) => {
    const { friend } = props;

    return (
        <div className="flexDirectionColumn">
            <div className="flexDirectionRow">
                <Avatar avatar={friend.avatar} size="small" containerStyle={overrideAvatarContainerStyle} />
                <div className="flexDirectionColumn">
                    <div><strong>{friend.username}</strong> <button>&#9998;</button></div>
                    <PlayerStatusDisplay status={friend.currentStatus} overrideStyle={statusDisplayStyle} />
                </div>
            </div>
        </div>
    );
};

const GameAndPlayerCard = (props) => {
    const { friend, game } = props;
    
    const gameImageStyle = {
        display: 'block',
        marginRight: '7px'
    }

    const friendEntryStyle = {
        marginBottom: '0.5rem',
        // borderBottom: '1px solid var(--color-gold)',
    };

    return (
        <div className="flexDirectionRow width-100" style={friendEntryStyle}>
            {/* Show the game image */}
            <div style={gameImageStyle}>
                <img src={game.image} alt={game.name} width="50" height="60" />
            </div>
            {/* Show the player card */}
            <FriendEntry friend={friend} />
        </div>
    );
};

export default FriendsList;

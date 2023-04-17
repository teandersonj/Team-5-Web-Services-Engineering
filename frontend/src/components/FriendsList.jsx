/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { createContext, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import FriendsListControlsModal from '../views/FriendsListControlsModal';
import Avatar from './Avatar';
import LabeledInput from './LabeledInput';
import PlayerPlaystyleDisplay from './PlayerPlaystyleDisplay';
import PlayerStatusDisplay from './PlayerStatusDisplay';
import { getNRandomGames } from '../services/GameInfoService';

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
    maxHeight: '2rem',
    padding: '0.5rem 1.2rem',
    fontSize: '1rem',
    maxWidth: 'fit-content'
};

const overrideAvatarContainerStyle = {
    width: '5rem',
    height: '5rem',
    marginRight: '0.5rem',
    marginTop: '10px'
};

const closeButtonStyle = {
    padding: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '10%',
    border: 'none',
    backgroundColor: 'var(--color-red)',
    color: 'var(--color-white)',
    cursor: 'pointer',
    height: 'fit-content',
    width: 'fit-content',
};

let gamesList = [];

// We need to access to the FriendsControlsModal for each friend (via the button next to each friend's name)
const FriendsControlsContext = createContext();

// So by giving access to the FriendsControlsModal to the FriendsList component, we can access the modal
// for each friend in the FriendsList component by passing the handleFriendControls function to each friend
// within the FriendEntry component
const FriendsControlsProvider = ({ children }) => {
    const [controlsModalState, setControlsModalState] = useState({
        isOpen: false,
        targetFriend: null,
    });

    const handleFriendControls = (e, friend) => {
        e.preventDefault();
        setControlsModalState({
            isOpen: true,
            targetFriend: friend,
        });
    };

    const closeModal = () => {
        setControlsModalState({
            isOpen: false,
            targetFriend: null,
        });
    };

    return (
        <FriendsControlsContext.Provider value={{ controlsModalState, setControlsModalState, handleFriendControls }}>
            {children}
            {(controlsModalState.isOpen && controlsModalState.targetFriend !== undefined) && <FriendsListControlsModal isOpen={controlsModalState.isOpen} targetFriend={controlsModalState.targetFriend} closeModal={closeModal} />}
        </FriendsControlsContext.Provider>
    );
};


const FriendsList = (props) => {
    const { user, updateUser } = useContext(UserContext);
    const friendsList = user?.friendsList;
    const [search, setSearch] = useState('');
    const [party, setParty] = useState(user?.currentParty || {});
    const [filteredFriends, setFilteredFriends] = useState(friendsList);
    const [games, setGames] = useState([]);

    // On load, generate some random games for displaying in the friends list
    // This is only for show right now and could be replaced by allowing a user
    // to select what they're currently playing
    useEffect(() => {
        const getGames = async () => {
            // TODO: Get games from server
            const data = await getNRandomGames(5).then((res) => {
                return res;
            }).catch((err) => {
                console.log("Error getting random games: ", err.response?.data?.message || err.message);
                return [];
            });

            setGames(data);
        };
        getGames();
    }, []);

    // Whenever the user updates their friends list (e.g. by adding a friend), update the filtered friends list
    useEffect(() => {
        setFilteredFriends(friendsList);
    }, [friendsList]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (friendsList === undefined || friendsList.length === 0) {
            setFilteredFriends([]);
            return;
        }

        if (search === '') {
            setFilteredFriends(user.friendsList);
            return;
        }

        // TODO: Get results sorted by the recommendation algorithm from server
        const newFilteredFriends = friendsList.filter(friend => friend.user?.username?.toLowerCase().includes(search.toLowerCase()));

        setFilteredFriends(newFilteredFriends);
    };

    const handleFilter = (e) => {
        e.preventDefault();
        // Filter the friends list based on the search state
    };

    const handleClear = (e) => {
        e.preventDefault();
        setSearch('');
        setFilteredFriends(friendsList);
    };

    return (
        <FriendsControlsProvider>
            <div className={`${props.open ? "friends-list" : 'hidden'}`}>
                <div className="friends-list-header">
                    <div className="flexDirectionRow">
                        <div>
                            <Avatar avatar={user.avatar} containerStyle={overrideAvatarContainerStyle} playerStatus={user.currentStatus} />
                        </div>
                        <div className="flexDirectionColumn flexGrow-1 justifyContentCenter">
                            <div><strong>{user.username}</strong></div>
                            <PlayerStatusDisplay status={user.currentStatus} overrideStyle={statusDisplayStyle} />
                        </div>
                        <button className="roundedBlueBtn" style={closeButtonStyle} onClick={e => props.closeFunction()}>X</button>
                    </div>
                    <div className="flexDirectionRow">
                        <LabeledInput containerClassName="flexGrow-1" label="" placeholder="Type username here..." id="search" name="search" value={search} onChange={e => setSearch(e.target.value)} />
                        <button className="roundedBlueBtn" onClick={e => handleSearch(e)}>Search</button>
                        {/* <button className="roundedBlueBtn" onClick={e => handleFilter(e)}>Filter</button> */}
                        <button className="roundedBlueBtn" onClick={e => handleClear(e)}>Clear</button>
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
                                    <GameAndPlayerCard friend={user.currentParty.members[0]} game={user.currentParty.game || games[Math.floor(Math.random() * games.length)]} />
                                </div>
                                {/* If the user has more than one friend in their party show the rest of the party, but without the game image in front */}
                                {user.currentParty?.members?.length > 1 && (
                                    <div className="flexDirectionRow">
                                        {user.currentParty?.members.slice(1).map((friend, index) => (
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
                        {filteredFriends?.filter?.(friend => friend.currentStatus === 'In-Game').length > 0 ? (
                            <>
                                {/* If any of the friends have the status In-Game */}
                                {filteredFriends?.filter?.(friend => friend.currentStatus === 'In-Game').map((friend, index) => (
                                    <div key={"inGame"+friend.user.username} className="flexDirectionRow">
                                        <GameAndPlayerCard friend={friend} game={games[Math.floor(Math.random() * games.length)]} />
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
                        {filteredFriends?.filter?.(friend => friend.currentStatus === 'Online').length > 0 ? (
                            <>
                                {filteredFriends?.filter?.(friend => friend.currentStatus === 'Online').map((friend, index) => (
                                    <div key={"online"+friend.user.username} className="flexDirectionRow">
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
                        {filteredFriends?.filter?.(friend => friend.currentStatus === 'Offline').length > 0 ? (
                            <>
                                {filteredFriends?.filter?.(friend => friend.currentStatus === 'Offline').map((friend, index) => (
                                    <div key={"offline"+friend.user.username} className="flexDirectionRow">
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
        </FriendsControlsProvider>
    );
};

const FriendEntry = (props) => {
    const { friend } = props;
    const { handleFriendControls } = useContext(FriendsControlsContext);

    return (
        <div className="flexDirectionColumn">
            <div className="flexDirectionRow">
                <Avatar avatar={friend.avatar} size="small" containerStyle={overrideAvatarContainerStyle} playerStatus={friend.currentStatus} />
                <div className="flexDirectionColumn">
                    <div><strong>{friend.user.username}</strong> <button onClick={(e) => handleFriendControls(e, friend)}>&#9998;</button></div>
                    <PlayerStatusDisplay status={friend.currentStatus} overrideStyle={statusDisplayStyle} />
                </div>
            </div>
        </div>
    );
};

const GameAndPlayerCard = (props) => {
    const { friend } = props;
    const game = props.game || null;

    const gameImageStyle = {
        display: 'block',
        margin: '10px',
        marginTop: '22px'
    }

    const friendEntryStyle = {
        marginBottom: '0.5rem',
        // borderBottom: '1px solid var(--color-gold)',
    };

    return (
        <div className="flexDirectionRow width-100" style={friendEntryStyle}>
            {/* Show the game image */}
            <img src={game?.image || "https://via.placeholder.com/50x60"} alt={game?.name || "Game Image"} style={gameImageStyle} width="50" height="60" />
            {/* Show the player card */}
            <FriendEntry friend={friend} />
        </div>
    );
};

export default FriendsList;

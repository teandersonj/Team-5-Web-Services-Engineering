import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { getNRandomGames } from "../services/GameInfoService";
import toast from "react-hot-toast";

import PlayerCard from "../components/PlayerCard";
import LabeledInput from "../components/LabeledInput";
import Avatar from "../components/Avatar";

export default function UserProfile(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user: loggedInUser, addFriend } = useContext(UserContext);

    const initialState = {};

    // Load the user's games and friends list
    useEffect(() => {
        // Ensure a proper ID was passed in
        if (id === undefined || id === null) {
            navigate("/Error404");
        }

        // Try to load the player's profile from the backend
        const getPlayer = async () => {
            const response = await fetch(`/api/players/${id}`);
            const data = await response.json();
            if (response.ok || response.status === 304 || response.status === 200) {
                initialState.pk = data.pk;
                initialState.userId = data.user?.id;
                initialState.username = data.user?.username;
                initialState.first_name = data.user?.first_name;
                initialState.last_name = data.user?.last_name;
                initialState.email = data.user?.email;
                initialState.avatar = data?.AvatarName;
                // TODO: Allow users to set their own status
                // For now choose a random value in "Offline", "In-Game", "Online"
                initialState.currentStatus = ["Offline", "In-Game", "Online"][Math.floor(Math.random() * 3)];
                initialState.playstyle = data?.Playstyle;
                initialState.bio = data?.Bio;
                // TODO: Get games from backend
                initialState.favoriteGames = await getNRandomGames(5);
                initialState.recentlyPlayedGames = await getNRandomGames(3);
                // Fetch some users from dummyData.json to use as friends
                // TODO: Get the player's friends from backend
                const dummyData = await fetch("/dummyData.json").then((res) => res.json()).then((data) => data.users);
                initialState.friendsList = [];
                for (let i = 0; i < 5; i++) {
                    initialState.friendsList.push(dummyData.users[Math.floor(Math.random() * dummyData.users.length)]);
                }
            } else {
                // Navigate backward
                navigate(-1);
                toast.error("Error loading player profile");
            }
        };

        getPlayer();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useState(initialState);

    const fieldStyle = {
        fontSize: "1.25em",
        margin: "5px 0",
        padding: "5px",
        borderRadius: "5px"
    };

    return (
        <>
            <div className="sectionContainer">
                <div className="leftSection flexDirectionColumn centerText">
                    <button className="width-100" style={{ ...fieldStyle, backgroundColor: "var(--color-red)" }} onClick={(e) => navigate(-1)}>Go Back</button>
                    {/* This'll be the user's avatar in a circle, and we need to have a button on the bottom right corner for Edit */}
                    <Avatar avatar={state.avatar} containerStyle={{ margin: "0 auto" }} size="large" />
                    <div className="width-100 centerText" style={{ ...fieldStyle }}>{state.username}</div>
                    <div className="width-100 centerText" style={{ ...fieldStyle, backgroundColor: "var(--color-light-blue)" }}>{state.currentStatus}</div>
                    <div className="width-100 centerText" style={{ ...fieldStyle, backgroundColor: "var(--color-green)" }}>{state.playstyle} Player</div>
                    {/* If this player isn't a friend of ours we'll show the Add Friend button, otherwise show the Remove Friend option */}
                    {loggedInUser.friendsList?.find?.((v) => v.pk === state.pk) ? (
                        <button className="width-100" style={{ ...fieldStyle, backgroundColor: "var(--color-red)" }}>Remove Friend</button>
                    ) : (
                        <button className="width-100" style={{ ...fieldStyle, backgroundColor: "var(--color-dark-blue)" }} onClick={(e) => addFriend(e, state.pk)}>Add Friend</button>
                    )}
                    <LabeledInput type="textarea" id="bio" label="User Bio" value={state.bio} orientation="vertical" containerStyle={{ marginTop: "5px" }} labelStyle={{ fontWeight: "bold" }} inputStyle={{ resize: "none", background: "none" }} disabled />
                </div>
                <div className="rightSection flexDirectionColumn alignContentCenter">
                    <div className="flexGrow-1">
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Favorite Games</h3>
                        <GamesContainer type="favorite" size="large" user={state} />
                    </div>
                    <div className="flexGrow-1">
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Recently Played</h3>
                        <GamesContainer type="recent" size="medium" className="justifyContentSpaceEvenly" user={state} />
                    </div>
                    <div>
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Friends</h3>
                        <ProfileFriendsList user={state} />
                    </div>
                </div>
            </div>
        </>
    );
};

const GamesContainer = (props) => {
    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        overflowX: "auto",
        margin: 0,
        padding: 0,
    };

    const sizes = {
        large: {
            width: "180",
            height: "270"
        },
        medium: {
            width: "90",
            height: "135"
        }
    };

    const imgProps = {
        width: sizes[props.size]?.width,
        height: sizes[props.size]?.height,
        style: {
            margin: "5px",
        }
    };

    if (props.type === "favorite") {
        return (
            <div style={rowStyle} className={`flexDirectionRow ${props.className}`}>
                {props.user.favoriteGames?.length > 0 ? props.user?.favoriteGames?.map((v, i) => {
                    return (
                        <div key={v.GameId}>
                            <img src={v.image} alt={v.name} {...imgProps} />
                        </div>
                    );
                }) : <div>No games found.</div>}
            </div>
        );
    } else if (props.type === "recent") {
        return (
            <div style={rowStyle} className={`flexDirectionRow ${props.className}`}>
                {props.user.recentlyPlayedGames?.length > 0 ? props.user?.recentlyPlayedGames?.map((v, i) => {
                    return (
                        <div key={v.GameId}>
                            <img src={v.image} alt={v.name} {...imgProps} />
                        </div>
                    );
                }) : <div>No games found.</div>}
            </div>
        );
    }
};

const ProfileFriendsList = (props) => {
    return (
        <div className="flexDirectionRow justifyContentSpaceEvenly">
            {props.user?.friendsList?.length > 0 ? props.user?.friendsList?.map((friend, index) => (
                <PlayerCard key={"UserProfilePlayerCard"+friend.user?.username} player={friend} size={"small"} noLabels={true} />
            )) : <div>No friends found.</div>}
        </div>
    );
};

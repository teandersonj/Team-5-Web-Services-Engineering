import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { getNRandomGames } from "../services/GameInfoService";

import PlayerCard from "../components/PlayerCard";
import LabeledInput from "../components/LabeledInput";
import Avatar from "../components/Avatar";

export default function UserProfile(props) {
    const navigate = useNavigate();
    const { user, updateUser, getFriends } = useContext(UserContext);

    // Load the user's games and friends list
    useEffect(() => {
        if (user === null) {
            navigate("/");
        } else {
            getFriends();
            // Fill up favoriteGames and recentlyPlayedGames with dummy data
            // TODO: Get user's games from backend
            (async () => {
                updateUser({
                    favoriteGames: await getNRandomGames(4),
                    recentlyPlayedGames: await getNRandomGames(5)
                });
            })();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    {/* This'll be the user's avatar in a circle, and we need to have a button on the bottom right corner for Edit */}
                    <Avatar avatar={user.avatar} containerStyle={{ margin: "0 auto" }} size="large" />
                    <div className="width-100 centerText" style={{ ...fieldStyle }}>{user.username}</div>
                    <div className="width-100 centerText" style={{ ...fieldStyle, backgroundColor: "var(--color-light-blue)" }}>{user.currentStatus}</div>
                    <div className="width-100 centerText" style={{ ...fieldStyle, backgroundColor: "var(--color-green)" }}>{user.playstyle} Player</div>
                    <button className="width-100" style={{ ...fieldStyle, backgroundColor: "var(--color-dark-blue)" }} onClick={() => navigate("/account-settings")}>Edit Profile</button>
                    <LabeledInput type="textarea" id="bio" label="User Bio" value={user.bio} orientation="vertical" containerStyle={{ marginTop: "5px" }} labelStyle={{ fontWeight: "bold" }} inputStyle={{ resize: "none", background: "none" }} disabled />
                </div>
                <div className="rightSection flexDirectionColumn alignContentCenter">
                    <div className="flexGrow-1">
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Favorite Games</h3>
                        <GamesContainer type="favorite" size="large" user={user} />
                    </div>
                    <div className="flexGrow-1">
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Recently Played</h3>
                        <GamesContainer type="recent" size="medium" className="justifyContentSpaceEvenly" user={user} />
                    </div>
                    <div>
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Friends</h3>
                        <FriendsList user={user} updateUser={updateUser} />
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

const FriendsList = (props) => {
    return (
        <div className="flexDirectionRow justifyContentSpaceEvenly">
            {props.user?.friendsList?.length > 0 ? props.user?.friendsList?.map((friend, index) => (
                <PlayerCard key={"UserProfilePlayerCard"+friend.user?.username} player={friend} size={"small"} noLabels={true} />
            )) : <div>No friends found.</div>}
        </div>
    );
};

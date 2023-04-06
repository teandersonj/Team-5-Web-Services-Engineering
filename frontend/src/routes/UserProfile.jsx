import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

import PlayerCard from "../components/PlayerCard";
import LabeledInput from "../components/LabeledInput";
import Avatar from "../components/Avatar";

export default function UserProfile(props) {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext);

    // Load the user's games and friends list
    useEffect(() => {
        // TODO: Load from server
        fetch("/dummyData.json",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            },
        ).then((res) => res.json()).then((data) => {
            const newData = {
                ...user,
                friendsList: data.users,
                favoriteGames: data.games,
                blockedUsers: data.users
            }
            updateUser(newData);
            return;
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO: We can reuse this page for other users' profiles, so we need to be able to pass in a user object
    // from the parent component, and if it's not passed in, we'll use the user object from the UserContext
    // assuming it's the current user's profile
    // We may end up using this if the page needs to be popoulated with a different player's info
    // eslint-disable-next-line no-unused-vars
    const [formState, setFormState] = useState({
        username: "",
        currentStatus: "",
        playstyle: "",
        bio: "",
        favoriteGames: [],
        recentGames: [],
        disabled: false,
        errors: {}
    });

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
                        <GamesContainer size="large" user={user} />
                    </div>
                    <div className="flexGrow-1">
                        <h3 className="pageHeading" style={{ fontSize: "1.5em" }}>Recently Played</h3>
                        <GamesContainer size="medium" className="justifyContentSpaceEvenly" user={user} />
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

    return (
        <div style={rowStyle} className={`flexDirectionRow ${props.className}`}>
            {props.user.favoriteGames?.length > 0 && props.user?.favoriteGames?.map((v, i) => {
                return (
                    <div key={v.GameId}>
                        <img src={v.image} alt={v.name} {...imgProps} />
                    </div>
                );
            })}
        </div>
    );
};

const FriendsList = (props) => {
    return (
        <div className="flexDirectionRow justifyContentSpaceEvenly">
            {props.user?.friendsList && props.user?.friendsList?.map((friend, index) => (
                <PlayerCard key={friend.username} player={friend} size={"small"} noLabels={true} />
            ))}
        </div>
    );
};

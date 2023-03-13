import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

import LabeledInput from "../components/LabeledInput";

export default function UserProfile(props) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    
    // TODO: We can reuse this page for other users' profiles, so we need to be able to pass in a user object
    // from the parent component, and if it's not passed in, we'll use the user object from the UserContext
    // assuming it's the current user's profile

    // TODO: Need an edit button, and to keep track of form state, as well as Submit buttons

    return (
        <>
            {/* TODO:  We could have the username here so it's like {Username's} Profile */}
            <h1 className="pageHeading centerText">User Profile</h1>
            <hr className="width-100" />
            <div className="sectionContainer">
                <div className="leftSection flexDirectionColumn centerText">
                    {/* This'll be the user's avatar in a circle, and we need to have a button on the bottom right corner for Edit */}
                    <div>
                        <img style={{ display: "block", margin: "5px auto" }} src={user.avatar || "https://via.placeholder.com/150"} alt="User Avatar" className="avatar imageShadow" />
                        <button>Edit</button>
                    </div>
                    <LabeledInput type="text" id="username" label="Username" defaultValue={user.username || "Unset"} orientation="vertical" disabled />
                    <LabeledInput type="text" id="status" label="Current Game / Status" defaultValue={user.currentGameStatus || "Unset"} orientation="vertical" disabled />
                    <LabeledInput type="text" id="playstyle" label="Playstyle" defaultValue={user.playstyle || "Unset"} orientation="vertical" disabled />
                    <LabeledInput type="textarea" id="bio" label="Bio" defaultValue={user.bio || "Unset"} orientation="vertical" disabled />
                </div>
                <div className="rightSection flexDirectionColumn">
                    <div>
                        <h3>Favorite Games</h3>
                        <SampleGames />
                    </div>
                    <div>
                        <h3>Recent Games</h3>
                        <SampleGames style={{ flexGrow: 1, justifyContent: "center" }} />
                    </div>
                    <div>
                        <h3>Friends List</h3>
                        <SampleGames />
                    </div>
                </div>
            </div>

            <hr className="width-100" />
            <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                <h3>User State: </h3>
                <code>
                    {JSON.stringify(user)}
                </code>
            </div>
        </>
    );
}

const SampleGames = (props) => {
    const { rest } = props;
    return (
        <div className="flexDirectionRow justifyContentSpaceEvenly" {...rest}>
            <div className="flexDirectionColumn justifyContentStretch">
                <img width="50" height="50" src="https://via.placeholder.com/50" />
                <div>Game 1</div>
            </div>
            <div className="flexDirectionColumn">
                <img width="50" height="50" src="https://via.placeholder.com/50" />
                <div>Game 2</div>
            </div>
            <div className="flexDirectionColumn">
                <img width="50" height="50" src="https://via.placeholder.com/50" />
                <div>Game 3</div>
            </div>
            <div className="flexDirectionColumn">
                <img width="50" height="50" src="https://via.placeholder.com/50" />
                <div>Game 4</div>
            </div>
            <div className="flexDirectionColumn">
                <img width="50" height="50" src="https://via.placeholder.com/50" />
                <div>Game 5</div>
            </div>
        </div>
    );
};

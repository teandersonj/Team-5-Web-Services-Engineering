import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function UserProfile(props) {
    const navigate = useNavigate();

    // Make sure user is logged in and then display their info
    const { user, logout } = useContext(UserContext);
    if (!user.loggedIn) {
        alert("You must be logged in to access this page");
        navigate("/login");
    }
    
    return (
        <div>
            <h1 className="centerText">User Profile (Dashboard)</h1>
            <div><strong>UserName: {user.userName}</strong></div>
            <div>Current Game / Status: {user.currentGameStatus || "Unset"}</div>
            <div><button onClick={() => logout()}>Log Out</button></div>
            <hr />
            <button onClick={() => navigate("/profile")}>My Profile</button>
            <button onClick={() => navigate("/find-games")}>Find Game</button>
            <button onClick={() => navigate("/find-players")}>Find Players</button>
            <button onClick={() => navigate("/settings")}>User/Account Settings</button>
        </div>
    );

}

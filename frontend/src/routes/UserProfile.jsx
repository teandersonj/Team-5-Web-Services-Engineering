import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function Dashboard(props) {
    // Make sure user is logged in and then display their info
    const user = useContext(UserContext);
    if (!user.loggedIn) {
        alert("You must be logged in to access this page");
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <h1 className="centerText">Dashboard</h1>
            <div><strong>UserName: {user.userName}</strong></div>
            <div>Current Game / Status: {user.currentGameStatus || "Unset"}</div>
            <div><button onClick={() => user.logout}>Log Out</button></div>
            <hr />
            <button><Link className="Link roundedBlue" to="/home">Home</Link></button>
            <button><Link className="Link roundedGray" to="/find-game">Find Game</Link></button>
            <button><Link className="Link roundedGray" to="/find-players">Find Players</Link></button>
        </div>
    );

}

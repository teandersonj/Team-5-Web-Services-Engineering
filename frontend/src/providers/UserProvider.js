import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// We can use this context to pass the user object to any component that needs it
export const UserContext = createContext({});

// This is the provider that will wrap the entire app, giving User Context access to necessary components
const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const getInitialState = () => ({
        id: "",
        loggedIn: false,
        username: null,
        first_name: "",
        last_name: "",
        email: "",
        avatar: "avatar1",
        playstyle: "",
        bio: "",
        accessToken: "",
        refreshToken: "",
        memberSince: "",
        currentStatus: "Online",
        currentParty: "",
        friendsList: "",
        blockedPlayers: "",
        // Need to know how long they've been logged in for/when they first logged/or used refresh token
        loggedInDateTime: "",
        lastRefreshDateTime: "",
    });

    const [user, setUser] = useState(getInitialState());

    // Whenever the user state changes, update the user in localStorage
    // This is to preserve their state in case of a full page refresh or if they close the tab
    // Ideally this will do some check server-side to make sure the session is still valid and
    // that the user is still logged in there.
    // This is one way to do it without using cookies to store the session info
    // However it is vulnerable to XSS attacks 
    useEffect(() => {
        // console.log("UserProvider noticed a change in the user: ", user, " \nUpdating user in localStorage... "); 
        // Update the user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    // Logs out the user clientside; need to eventually call the serverside logout function
    const logout = (e) => {
        // Have to reset all keyvalue pairs in this temp object before assigning it to state
        // Otherwise, the state will be set to the initial state, but state will still have any new keys added
        const stateReset = Object.keys(user).reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
        // This should reset the state to the initial state and remove the user from localStorage
        setUser({ ...stateReset, ...getInitialState() });
        navigate("/");
    }

    const updateUser = (userInfo) => {
        setUser((prev) => ({ ...prev, ...userInfo }));
    };

    return (
        // The value prop is what will be available to any component that consumes this context
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

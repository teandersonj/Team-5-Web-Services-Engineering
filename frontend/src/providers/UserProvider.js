import React, { useState, createContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// We can use this context to pass the user object to any component that needs it
export const UserContext = createContext({});

// This is the provider that will wrap the entire app, giving context access to all components
const UserProvider = ({ children }) => {
    const getInitialState = () => ({
        loggedIn: false,
        userName: null,
        fName: null,
        lName: null,
        email: null,
        avatar: null,
        playstyle: null,
        apiToken: null,
        refreshToken: null,
        memberSince: null,
        currentGameStatus: null,
        currentParty: null,
        friendsList: null,
        blockedPlayers: null 
    });

    const [user, setUser] = useState(getInitialState());

    useEffect(() => {
        console.log("UserProvider noticed a change in the user: ", user); 
    }, [user]);

    // Logs in the user clientside; need to eventually call the serverside login function
    const login = (userInfo) => {
        const newUser = { ...userInfo, loggedIn: true };
        setUser((prev) => newUser);
    }

    // Logs out the user clientside; need to eventually call the serverside logout function
    const logout = (e) => {
        // Reset the state to the initial state
        const keys = Object.keys(user);
        // Have to reset all keyvalue pairs in this temp object before assigning it to state
        const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
        setUser({ ...stateReset, ...getInitialState() });
        window.location.href = "/";
    }

    const updateUser = (userInfo) => {
        setUser((prev) => ({ ...prev, ...userInfo }));
    };


    return (
        // The value prop is what will be available to any component that consumes this context
        <UserContext.Provider value={{ user, updateUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

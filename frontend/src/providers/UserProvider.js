import { useState, createContext, useEffect } from 'react';

// We can use this context to pass the user object to any component that needs it
export const UserContext = createContext({});

// This is the provider that will wrap the entire app, giving context access to all components
const UserProvider = ({ children }) => {
    const getInitialState = () => ({
        'loggedIn': false
    });

    const [user, setUser] = useState(getInitialState());

    // Logs in the user clientside; need to eventually call the serverside login function
    const login = (user) => {
        setUser(user);
    }

    // Logs out the user clientside; need to eventually call the serverside logout function
    const logout = () => {
        // Reset the state to the initial state
        const keys = Object.keys(user);
        // Have to reset all keyvalue pairs in this temp object before assigning it to state
        const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
        setUser({ ...stateReset, ...getInitialState() });
        // Could return <Navigate to="/" /> here to redirect to the home page
        window.location.href = "/";
        return;
    }

    return (
        // The value prop is what will be available to any component that consumes this context
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

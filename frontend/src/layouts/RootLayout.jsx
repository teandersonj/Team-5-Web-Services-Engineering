import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import Navbar from './Navbar';

export default function Layout(props) { 
    const userContext = useContext(UserContext);
    // This component represents the root layout for the app that will give it a uniform structure
    // It'll hold the nav bar and the main content section, which in turn will render the appropriate
    // component based on the current path
    return (
        // If the user's logged in, we want to show the Navbar, which requires UserLayout on App
        <div className={userContext.user.loggedIn ? "App UserLayout" : "App GuestLayout"}>
            {/* This is the nav bar that will persist across page changes */}
            {/* We only want to show it when the user's logged in. */}
            {!!userContext.user.loggedIn && <Navbar userContext={userContext} />}
            {/* In the prototypes we have the nav and then a content section on the right
            This represents that section */}
            <main>
                {/* This renders any nested/child route appropriate to the current path */}
                <Outlet />
            </main>
        </div>
    );

};

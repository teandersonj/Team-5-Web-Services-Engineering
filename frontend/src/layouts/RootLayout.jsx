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
        <div className={userContext.user.loggedIn ? "App UserLayout" : "App GuestLayout"}>
            {/* This is the nav bar that will persist across page changes */}
            <Navbar userContext={userContext} />
            {/* In the prototypes we have the nav and then a content section on the right
            This represents that section */}
            <main>
                {/* This renders any nested/child route appropriate to the current path */}
                <Outlet />
                {/* Currently, whatever's in <main> in the child element/route will appeaer centered in the main-content-section */}
            </main>
            <footer>
                <p>&copy; Fireside Games 2023</p>
            </footer>
        </div>
    );

};

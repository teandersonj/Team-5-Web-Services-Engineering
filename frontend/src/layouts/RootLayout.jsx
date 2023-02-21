import { Outlet } from 'react-router-dom';
import Nav from './Nav';

export default function Layout(props) { 
    // This component represents the root layout for the app that will give it a uniform structure
    // It'll hold the nav bar and the main content section, which in turn will render the appropriate
    // component based on the current path
    return (
        <>
            {/* This is the nav bar that will persist across page changes */}
            <Nav />
            {/* In the prototypes we have the nav and then a content section on the right
            This represents that section */}
            <div className="mainContainer">
                {/* This renders any nested/child route appropriate to the current path */}
                <Outlet />
                {/* Currently, whatever's in <main> in the child element/route will appeaer centered in the main-content-section */}
            </div>
        </>
    );

};

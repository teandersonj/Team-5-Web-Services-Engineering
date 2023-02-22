import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user, redirectPath = '/', children }) => {
    // If authorized, render child elements
    // If not, return element that will navigate to home (login?) page
    if (!user.loggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;

import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// The root layout that will be used for all routes
import Layout from "./layouts/RootLayout";

// Import the routes that will be nested within the Layout
// import GuestHome from "./routes/GuestHome";
import Login from "./routes/Auth/Login";
import Register from "./routes/Auth/Register";
import ErrorPage from "./routes/ErrorPage";

import PrivateRoute from "./routes/PrivateRoute";
import UserProfile from "./routes/UserProfile";
import GameSearch from "./routes/GameSearch";
import PlayerSearch from "./routes/PlayerSearch";
import UserSettings from "./routes/UserSettings";

import './App.css';

import { UserContext } from "./providers/UserProvider";

// The App component is the root of the React component tree
function App() {
  const { user } = useContext(UserContext);
  return (
    // Within Routes we define the routes that will be available to the app
    // The 'path' attribute defines the URL path that will trigger the route,
    // and the 'element' attribute defines the component that will be rendered
    <Routes>
      {/* This first route represents the root layout. Nested routes appear as 
        children within the Layout by means of an Outlet. This allows some elements
        to persist across page changes, such as a nav area. */}
      <Route path="/" element={<Layout />}>
        {/* The 'index' attribute means navigating to '/' will show the Login page */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* This represents the private routes that can't be accessed without logging in */}
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/find-games" element={<GameSearch />} />
          <Route path="/find-players" element={<PlayerSearch />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>
        {/* Catch-all route that'll display an error page for routes not explicitly matched */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// The root layout that will be used for all routes
import Layout from "./layouts/RootLayout";

// Import the routes that will be nested within the Layout
import Login from "./routes/Auth/Login";
import Register from "./routes/Auth/Register";
import ContinueRegistration from "./routes/Auth/ContinueRegistration";
import FinishRegistration from "./routes/Auth/FinishRegistration";
import ErrorPage from "./routes/ErrorPage";

import PrivateRoute from "./routes/PrivateRoute";
import UserProfile from "./routes/UserProfile";
import GameSearch from "./routes/GameSearch";
import PlayerSearch from "./routes/PlayerSearch";
import UserSettings from "./routes/UserSettings";
import GeneralSettings from "./routes/GeneralSettings";

import './App.css';

import { UserContext } from "./providers/UserProvider";

// The App component is the root of the React component tree
function App() {
  const { user, updateUser } = useContext(UserContext);

  // Normally, when the page is refreshed, the user will be logged out, because the state is lost.
  // This useEffect will check if the user is logged in, and if so, restore the state.
  // This is done by checking if there's a user object in local storage.
  // If there is, we'll set the user state to that object via the UserContext.
  // This will trigger a re-render, and the user will be logged in.
  // Note: This means when we login we must also store the user object in local storage.
  // We could do an API call here to check if the session is still valid server-side,
  // or more likely check if their access token is still valid and request refresh if not
  useEffect(() => {
    const userItem = JSON.parse(localStorage.getItem("user"));
    if (userItem && userItem.loggedIn) {
      // TODO: Need to bring back the login function from the Login page into userprovider
      // userLogin(userItem);
      // Because just setting this to what we have in local storage could use stale info and 
      // it should be pulled from API depending if the access token is still valid
      updateUser(userItem);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Leaving the dependency array empty will cause this effect to only run once on mount (e.g. page load)

  return (
    <div id="app" data-testid="app">
      {/* Allows us to use toast() to generate toast notifications */}
      <Toaster />
      {/* Within Routes we define the routes that will be available to the app.
      The 'path' attribute defines the URL path that will trigger the route,
      and the 'element' attribute defines the component that will be rendered */}
      <Routes>
        {/* This first route represents the root layout. Nested routes appear as 
        children within the Layout by means of an Outlet. This allows some elements
        to persist across page changes, such as a nav area. */}
        <Route path="/" element={<Layout />}>
          {/* The 'index' attribute means navigating to '/' will show the Login page */}
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/continue" element={<ContinueRegistration />} />
          <Route path="/register/finish" element={<FinishRegistration />} />
          {/* This represents the private routes that can't be accessed without logging in */}
          <Route element={<PrivateRoute user={user} />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/find-games" element={<GameSearch />} />
            <Route path="/find-players" element={<PlayerSearch />} />
            <Route path="/account-settings" element={<UserSettings />} />
            <Route path="/general-settings" element={<GeneralSettings />} />
          </Route>
          {/* Catch-all route that'll display an error page for routes not explicitly matched */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

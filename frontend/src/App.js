import { Routes, Route, Link } from "react-router-dom";

// The root layout that will be used for all routes
import Layout from "./layouts/RootLayout";
// Import the routes that will be nested within the Layout
import GuestHome from "./routes/GuestHome";
import Login from "./routes/Auth/Login";
import Register from "./routes/Auth/Register";
import ErrorPage from "./routes/ErrorPage";

import './App.css';

// The App component is the root of the React component tree
function App() {
  return (
    // Within Routes we define the routes that will be available to the app
    // The 'path' attribute defines the URL path that will trigger the route,
    // and the 'element' attribute defines the component that will be rendered
    <Routes>
      {/* This first route represents the root layout. Nested routes appear as 
        children within the Layout by means of an Outlet. This allows some elements
        to persist across page changes, such as a nav area. */}
      {/* TODO: Probably don't want to show the same nav for a guest as when logged in */}
      {/* <Route path="/" element={userLoggedIn ? <AuthenticatedLayout /> : <Layout />}> */}
      <Route path="/" element={<Layout />}>
        {/* The 'index' attribute means navigating to '/' will show Guest Home */}
        <Route index element={<GuestHome />} />
        {/* The authentication routes will appear within Layout as well.
          TODO: This may not be desired. */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Catch-all route that'll display an error page for routes not explicitly matched */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;

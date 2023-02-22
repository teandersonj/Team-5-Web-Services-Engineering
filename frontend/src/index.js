import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './providers/UserProvider';

// This is the new data router that gives some interesting features,
// however it is more complex that just using <BrowserRouter> and <Routes>
// const browswerRouter = createBrowserRouter([
//   { path: '/', element: <App /> },
//   { path: '/login', element: <Login /> },
//   { path: '/register', element: <Register /> },
//   { path: '*', element: <ErrorPage /> },
// ]});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // This helps with debugging, but it's not necessary esp. for production and will
  // cause double rendering
  // <React.StrictMode>
  // {/* Provide router access to the App */}
  // {/* Additional Context Providers will go here, enclosing App */}
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './providers/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // This helps with debugging, but it's not necessary esp. for production and will
  // cause double rendering
  // <React.StrictMode>
  // {/* Additional Context Providers will go here, enclosing App */}
  // {/* Provide router access to the App */ }
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

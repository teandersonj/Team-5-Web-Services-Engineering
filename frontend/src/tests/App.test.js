import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

import UserProvider from '../providers/UserProvider';

// Mock the various routes
// jest.mock('../routes/ErrorPage');
// jest.mock('../routes/Auth/Login');
// jest.mock('../routes/Auth/Register');
// jest.mock('../routes/UserProfile');
// jest.mock('../routes/UserSettings');
// jest.mock('../routes/GameSearch');
// jest.mock('../routes/PlayerSearch');
// jest.mock('../routes/PrivateRoute');

// Test whether the App component renders
test('renders App component', () => {
  render(
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  );

  // Check if the App component is rendered in document.body
  // Look for the div with ID app
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});

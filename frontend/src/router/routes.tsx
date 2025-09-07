import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../pages/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
    ],
  },
]);

export default router;
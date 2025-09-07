import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import ExploreIdeas from '@/pages/ExploreIdeas';
import ProjectDetail from '@/pages/ProjectDetail';
import IdeaDetails from '@/pages/IdeaDetails';
import ContactUs from '@/pages/ContactUs';
import LoginPage from '@/pages/Login';
import AboutPage from '@/pages/AboutUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "ideas", element: <ExploreIdeas /> },
      { path: "projects/:id", element: <ProjectDetail /> },
      { path: "ideas/:id", element: <IdeaDetails /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <LoginPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

export default router;
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import HospitalSearchResult from './pages/HospitalSearchResult';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/hospital/search/result',
    element: <HospitalSearchResult />,
  },
]);

export default router;

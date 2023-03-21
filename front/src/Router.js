import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import HospitalSearchResult from './pages/HospitalSearchResult';
import HospitalSearch from './pages/HospitalSearch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/hospital/search/result',
    element: <HospitalSearchResult />,
  },
  {
    path: '/hospital/search',
    element: <HospitalSearch />,
  },
]);

export default router;

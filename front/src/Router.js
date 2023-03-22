import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import HospitalSearchResult from './pages/HospitalSearchResult';
import HospitalSearch from './pages/HospitalSearch';
import MyPageMedicineBag from './pages/MyPageMedicineBag';
import MyPageFavorite from './pages/MyPageFavorite';
import MyPageBasket from './pages/MyPageBasket';

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
  {
    path: '/mypage/medicinebag',
    element: <MyPageMedicineBag />,
  },
  {
    path: '/mypage/favorite',
    element: <MyPageFavorite />,
  },
  {
    path: '/mypage/basket',
    element: <MyPageBasket />,
  },
]);

export default router;

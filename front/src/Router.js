import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import HospitalSearchResult from './pages/hospital/HospitalSearchResult';
import HospitalSearch from './pages/hospital/HospitalSearch';
import MyPageMedicine from './pages/mypage/MyPageMedicine';
import MyPageHospitalList from './pages/mypage/MyPageHospitalList';
import MyPageBasket from './pages/mypage/MyPageBasket';

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
    path: '/mypage/medicine',
    element: <MyPageMedicine />,
  },
  {
    path: '/mypage/hospitallist',
    element: <MyPageHospitalList />,
  },
  {
    path: '/mypage/basket',
    element: <MyPageBasket />,
  },
]);

export default router;

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import HospitalSearchResult from './pages/hospital/HospitalSearchResult';
import HospitalSearch from './pages/hospital/HospitalSearch';
import HospitalDetail from './pages/hospital/HospitalDetail';
import MyPageMedicine from './pages/mypage/MyPageMedicine';
import MyPageHospitalList from './pages/mypage/MyPageHospitalList';
import MyPageBasket from './pages/mypage/MyPageBasket';
import PillDetail from './pages/pill/PillDetail';
import GeolocationTest from './pages/GeolocationTest';
import KakaoMap from './components/kakao/KakaoMap';
import PillSearchResult from './pages/pill/PillSearchResult';
import PillSearch from './pages/pill/PillSearch';

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
    path: '/hospital/:hospitalId',
    element: <HospitalDetail />,
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
  {
    path: '/pill/search',
    element: <PillSearch />,
  },
  {
    path: '/pill/result',
    element: <PillSearchResult />,
  },
  {
    path: '/pill/:drugId',
    element: <PillDetail />,
  },
  {
    path: '/geolocationtest',
    element: <GeolocationTest />,
  },
  {
    path: 'kakaomap',
    element: <KakaoMap />,
  },
]);

export default router;

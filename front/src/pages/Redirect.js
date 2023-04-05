/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../atoms';

function Redirect() {
  // const location = useLocation();
  // console.log(location, 'location');
  // const code = new URL(window.location.href).searchParams.get('code');
  const [tokenState, setTokenState] = useRecoilState(loginState);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location) {
  //     localStorage.setItem('kakao-token', location.pathname);
  //   }
  //   if (localStorage.getItem('kakao-token')) setTokenState(true);
  //   navigate('/', { replace: true });
  // }, []);

  useEffect(() => {
    const getToken = async () => {
      // console.log(1);
      try {
        const url = new URL(document.location).searchParams;
        const accessToken = 'Bearer ' + url.get('accesstoken');
        localStorage.setItem('accessToken', accessToken);
        setTokenState(true);
        setTimeout(() => navigate('/', { replace: true }), 500);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);
  return <div>o</div>;
}

export default Redirect;

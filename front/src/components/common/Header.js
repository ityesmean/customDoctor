/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-concat */
import React from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginState } from '../../atoms';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

axios.defaults.withCredentials = true;

const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const SLogo = styled.div`
  font-size: 10vw;
  font-weight: bold;
  color: #00c192;
  margin-top: 5vh;
  margin-left: 6vw;
`;

function Header() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const accessToken = localStorage.getItem('accessToken');

  return (
    <SContainer>
      <SLink to="/">
        <SLogo>맞닥</SLogo>
      </SLink>
      {accessToken ? <LogoutButton /> : <LoginButton />}
    </SContainer>
  );
}

export default Header;

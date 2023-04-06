/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios';

import { loginState } from '../../atoms';

const SLogoutWrapper = styled.div`
  display: flex;
  width: 25vw;
  height: 10vw;
  border-radius: 5px;
  background-color: #00c192;
  margin-top: 5vh;
  margin-right: 5vw;
  align-items: center;
  padding: 1vw;
  color: white;
  font-weight: bold;
  justify-content: center;
`;

const SKakaoTalkLogo = styled.img`
  width: 10vw;
  height: 10vw;
`;

const SLogoutText = styled.div``;

function LogoutButton() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const accessToken = localStorage.getItem('accessToken');
  const onClickLogoutHandler = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        headers: { Authorization: accessToken },
      })
      .then(res => {
        console.log(res);
        setIsLogin(false);
        localStorage.removeItem('accessToken');
      })
      .catch(err => console.log(err));
    navigate('/');
  };
  return (
    <SLogoutWrapper onClick={onClickLogoutHandler}>
      <SLogoutText>로그아웃</SLogoutText>
    </SLogoutWrapper>
  );
}

export default LogoutButton;

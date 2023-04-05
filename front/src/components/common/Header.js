/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginState } from '../../atoms';

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

const SLoginButton = styled.button`
  font-size: 3vw;
  font-weight: bold;
  width: 25vw;
  height: 5vw;
  display: inline-block;
  /* margin-top: 28px; */
  color: #ffffff;
  background-color: #16a085;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  transition: 0.1s ease;
  margin: 1vw 1vw;
  cursor: pointer;
  &:hover {
    opacity: 1;
    background-color: #00c192;
    transition: 0.1s ease;
  }
`;

const SLoginLink = styled.a`
  color: white;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const SLogoutButton = styled.button`
  font-size: 3vw;
  font-weight: bold;
  width: 25vw;
  height: 5vw;
  display: inline-block;
  /* margin-top: 28px; */
  color: white;
  background-color: #16a085;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  transition: 0.1s ease;
  margin: 1vw 1vw;
  cursor: pointer;
  &:hover {
    opacity: 1;
    background-color: #00c192;
    transition: 0.1s ease;
  }
  button::after {
    width: 150%;
    height: 200%;
  }
`;

function Header() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const accessToken = localStorage.getItem('accessToken');

  const onClickLogoutHandler = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        headers: {
          Authorization: accessToken,
        },
        withCredentials: true,
      })
      .then(res => {
        setIsLogin(false);
        localStorage.removeItem('accessToken');
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <SContainer>
      <SLink to="/">
        <SLogo>맞닥</SLogo>
      </SLink>
      {accessToken ? (
        <SLogoutButton type="button" onClick={onClickLogoutHandler}>
          로그아웃
        </SLogoutButton>
      ) : (
        <SLoginButton>
          <SLoginLink
            href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`}
          >
            로그인
          </SLoginLink>
        </SLoginButton>
      )}
    </SContainer>
  );
}

export default Header;

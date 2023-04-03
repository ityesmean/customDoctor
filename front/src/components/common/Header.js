import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const SLoginButton = styled.button``;

const SLoginLink = styled.a`
  color: black;
  text-decoration: none;
`;

function Header() {
  return (
    <div>
      <SLink to="/">
        <SLogo>맞닥</SLogo>
      </SLink>
      <SLoginButton>
        {/* <SLoginLink href="http://192.168.31.33:8080/oauth2/authorization/kakao"> */}
        <SLoginLink href="https://localhost:8080/oauth2/authorization/kakao">
          로그인
        </SLoginLink>
      </SLoginButton>
    </div>
  );
}

export default Header;

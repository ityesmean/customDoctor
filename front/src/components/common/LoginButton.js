import React from 'react';
import styled from 'styled-components';

const SLoginButton = styled.div`
  display: flex;
  width: 25vw;
  height: 10vw;
  border-radius: 5px;
  background-color: #00c192;
  margin-top: 5vh;
  margin-right: 5vw;
  align-items: center;
  color: white;
  font-weight: bold;
  justify-content: center;
  padding-right: 1vw;
`;

const SLoginText = styled.a`
  color: white;
  text-decoration: none;
`;

function LoginButton() {
  return (
    <SLoginButton>
      <SLoginText
        href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`}
      >
        로그인
      </SLoginText>
    </SLoginButton>
  );
}

export default LoginButton;

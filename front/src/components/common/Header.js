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
  margin-bottom: 2vh;
`;

function Header() {
  return (
    <SLink to="/">
      <SLogo>맞닥</SLogo>
    </SLink>
  );
}

export default Header;

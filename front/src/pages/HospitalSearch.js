import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/common/BackButton';

import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';

const SLink = styled(Link)`
  text-decoration: none;
`;

const STitle1 = styled.div`
  font-weight: bold;
  font-size: 7vw;
  margin-left: 3vw;
  margin-bottom: 3vh;
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
`;

function HospitalSearch() {
  return (
    <>
      <Header />
      <SLink to="/">
        <BackButton />
      </SLink>
      <STitle1>병원명으로 검색</STitle1>
      <SearchBar />
      <SLine> </SLine>
    </>
  );
}

export default HospitalSearch;

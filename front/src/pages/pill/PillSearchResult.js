// import React from 'react';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/common/Header';

import BackButton from '../../components/common/BackButton';
import Vec from '../../assets/Vector.svg';
import DrugList from '../../components/pill/DrugList';

import { pillSearchSelectedOption } from '../../atoms';

const SLink = styled(Link)`
  text-decoration: none;
`;
const SSearchContainer = styled.div`
  width: 100vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
`;

const SSearchInput = styled.input`
  &::placeholder {
    padding-left: 5vw;
  }
  width: 80vw;
  height: 10vw;
  border: solid 1px #00c192;
  border-radius: 10vw;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const SSearchButton = styled.button`
  background-image: url('../assets/SmallVectors.png');
  background-color: white;
  width: 10vw;
  height: 10vw;
  border: solid 1px #00c192;
  border-radius: 50%;
  margin-left: 5vw;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
`;

const SCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PillSearchResult() {
  const resultOptions = useRecoilValue(pillSearchSelectedOption);

  useEffect(() => {
    console.log(resultOptions);
  }, []);

  return (
    <>
      <Header />
      <SLink to="/pill/search">
        <BackButton />
      </SLink>
      <SSearchContainer>
        <SLink to="/pill/search">
          <SSearchInput placeholder="검색어를 입력해 주세요." />
          <SSearchButton>
            <img src={Vec} alt="search" />
          </SSearchButton>
        </SLink>
        <SLine />
      </SSearchContainer>
      <SCardContainer>
        <DrugList />
      </SCardContainer>
    </>
  );
}

export default PillSearchResult;

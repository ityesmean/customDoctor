import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/common/Header';
import HospitalList from '../../components/hospital/HospitalList';
import BackButton from '../../components/common/BackButton';
import Vec from '../../assets/Vector.svg';

import { hospitalSearchSelectedOption } from '../../atoms';

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

const SFilterBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

const SOption = styled.div``;

const SLabel = styled.label`
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  padding-left: 8vw;
  padding-right: 8vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const SInput = styled.input.attrs({ type: 'radio' })`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: bold;
    display: none;
  }
  &:checked + ${SLabel} {
    background: #00c192;
    color: #fff;
  }
  display: none;
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
`;

function HospitalSearchResult() {
  const resultOptions = useRecoilValue(hospitalSearchSelectedOption);
  const option = ['거리순', '별점순', '영업중'];
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectedValue = e => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    console.log(resultOptions);
  }, []);

  return (
    <>
      <Header />
      <SLink to="/hospital/search">
        <BackButton />
      </SLink>
      <SSearchContainer>
        <SLink to="/hospital/search">
          <SSearchInput placeholder="검색어를 입력해 주세요." />
          <SSearchButton>
            <img src={Vec} alt="search" />
          </SSearchButton>
        </SLink>
      </SSearchContainer>
      <SFilterBox>
        {option.map(value => (
          <SOption key={value}>
            <SInput
              type="radio"
              onChange={handleSelectedValue}
              value={value}
              name="filter"
              id={value}
            />
            <SLabel htmlFor={value}>{value}</SLabel>
          </SOption>
        ))}
      </SFilterBox>
      <SLine> </SLine>
      <HospitalList selectedValue={selectedValue} />
    </>
  );
}

export default HospitalSearchResult;

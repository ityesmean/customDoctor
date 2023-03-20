import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import HospitalList from '../components/common/HospitalList';

const SFilter = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const SDistance = styled.div`
  text-align: center;
  width: 20vw;
  border: 0px;
  border-radius: 100px;
  font-weight: bold;
  padding-top: 2vw;
  padding-bottom: 2vw;
  padding-right: 3vw;
  padding-left: 3vw;
  background-color: ${props => (props.color ? '#00C192' : '#F1F3F4')};
  color: ${props => (props.color ? 'white' : 'black')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SStar = styled.div`
  text-align: center;
  width: 20vw;
  border: 0px;
  border-radius: 100px;
  font-weight: bold;
  padding-top: 2vw;
  padding-bottom: 2vw;
  padding-right: 3vw;
  padding-left: 3vw;
  background-color: ${props => (props.color ? '#00C192' : '#F1F3F4')};
  color: ${props => (props.color ? 'white' : 'black')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SIsOpen = styled.div`
  text-align: center;
  width: 20vw;
  border: 0px;
  border-radius: 100px;
  font-weight: bold;
  padding-top: 2vw;
  padding-bottom: 2vw;
  padding-right: 3vw;
  padding-left: 3vw;
  background-color: ${props => (props.color ? '#00C192' : '#F1F3F4')};
  color: ${props => (props.color ? 'white' : 'black')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function HospitalSearchResult() {
  const [isDistance, setIsDistance] = useState(true);
  const [isStar, setIsStar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('distance');

  // 거리순 버튼 선택될때 실행되는 함수
  const handleFilterDistance = () => {
    console.log('거리');
    setIsDistance(!isDistance);
    setIsStar(false);
    setIsOpen(false);
    setFilterOption('distance');
  };

  // 별점순 버튼 선택될때 실행되는 함수
  const handleFilterStar = () => {
    console.log('별');
    setIsStar(!isStar);
    setIsDistance(false);
    setIsOpen(false);
    setFilterOption('star');
  };

  // 진료중 버튼 선택될때 실행되는 함수
  const handleFilterOpen = () => {
    console.log('진료중');
    setIsOpen(!isOpen);
    setIsStar(false);
    setIsDistance(false);
    setFilterOption('open');
  };

  useEffect(() => {
    console.log(isDistance, isStar, isOpen);
  }, []);
  console.log(isDistance, isStar, isOpen);

  return (
    <>
      <SFilter>
        <SDistance
          type="button"
          color={isDistance}
          onClick={handleFilterDistance}
        >
          거리순
        </SDistance>
        <SStar type="button" color={isStar} onClick={handleFilterStar}>
          별점순
        </SStar>
        <SIsOpen type="button" color={isOpen} onClick={handleFilterOpen}>
          영업중
        </SIsOpen>
      </SFilter>
      <HospitalList filterOption={filterOption} />

      {/* <div></div> */}
    </>
  );
}

export default HospitalSearchResult;

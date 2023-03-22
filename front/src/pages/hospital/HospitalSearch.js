import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../../components/common/BackButton';

import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';

const SLink = styled(Link)`
  text-decoration: none;
`;

const STitle = styled.div`
  font-weight: bold;
  font-size: 7vw;
  margin-left: 3vw;
  margin-bottom: 3vh;
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
  margin-bottom: 3vh;
`;

const SSubTitle = styled.div`
  font-size: 6vw;
  margin-left: 3vw;
`;

const SMedicalDepartmentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  // justify-content: space-around;
  margin-top: 1vh;
  margin-bottom: 3vh;
`;

const SOption = styled.div`
  padding: 4vw;
`;

const SMedicalDepartmentLabel = styled.label`
  display: block;
  width: 20vw;
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  text-align: center;
`;

const SMedicalDepartmentInput = styled.input.attrs({ type: 'radio' })`
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
  &:checked + ${SMedicalDepartmentLabel} {
    background: #00c192;
    color: #fff;
  }
  display: none;
`;

const SNightOrDayoffBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1vh;
  margin-bottom: 3vh;
`;

const SNightOrDayoffLabel = styled.label`
  display: block;
  width: 20vw;
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  text-align: center;
`;

const SNightOrDayoffInput = styled.input.attrs({ type: 'radio' })`
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
  &:checked + ${SNightOrDayoffLabel} {
    background: #00c192;
    color: #fff;
  }
  display: none;
`;

const SButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SSearchButton = styled.button`
  background-color: #00c192;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 10vw;
  padding-right: 10vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 3vh;
`;

function HospitalSearch() {
  const navigate = useNavigate();

  const medicalDepartment = [
    '전체',
    '내과',
    '소아과',
    '안과',
    '치과',
    '외과',
    '피부과',
    '신경과',
    '정형외과',
    '신경외과',
    '산부인과',
    '비뇨기과',
    '성형외과',
    '이비인후과',
    '가정의학과',
    '마취통증과',
    '정신의학과',
    '한의원',
  ];

  const nightOrDayoff = [
    '전체',
    '토요일진료',
    '일요일진료',
    '공휴일진료',
    '야간 / 휴일',
  ];

  const [selectedMedicalDepartment, setSelectedMedicalDepartment] =
    useState('');
  const [selectedNightOrDayoff, setSelectedNightOrDayoff] = useState('');

  // 진료과목 선택시 실행되는 함수
  const handleSelectedMedicalDepartment = e => {
    setSelectedMedicalDepartment(e.target.value);
  };

  // 진료 시간 분류 선택시 실행되는 함수
  const handleSelectedNightOrDayoff = e => {
    setSelectedNightOrDayoff(e.target.value);
  };

  // 검색 버튼 클릭시 실행되는 함수
  const handleSearch = () => {
    navigate('/hospital/search/result');
  };

  console.log(selectedMedicalDepartment);
  console.log(selectedNightOrDayoff);

  return (
    <>
      <Header />
      <SLink to="/">
        <BackButton />
      </SLink>
      <STitle>병원명으로 검색</STitle>
      <SearchBar />
      <SLine> </SLine>
      <STitle>조건으로 검색</STitle>

      <SSubTitle>진료과목</SSubTitle>
      <SMedicalDepartmentBox>
        {medicalDepartment.map(value => (
          <SOption key={value}>
            <SMedicalDepartmentInput
              type="radio"
              onChange={handleSelectedMedicalDepartment}
              value={value}
              name="filter"
              id={value}
            />
            <SMedicalDepartmentLabel htmlFor={value}>
              {value}
            </SMedicalDepartmentLabel>
          </SOption>
        ))}
      </SMedicalDepartmentBox>

      <SSubTitle>야간 / 휴일</SSubTitle>
      <SNightOrDayoffBox>
        {nightOrDayoff.map(value => (
          <SOption key={value}>
            <SNightOrDayoffInput
              type="radio"
              onChange={handleSelectedNightOrDayoff}
              value={value}
              name="filter2"
              id={value}
            />
            <SNightOrDayoffLabel htmlFor={value}>{value}</SNightOrDayoffLabel>
          </SOption>
        ))}
      </SNightOrDayoffBox>

      <SButtonWrapper>
        <SSearchButton onClick={handleSearch}>검 색</SSearchButton>
      </SButtonWrapper>
    </>
  );
}

export default HospitalSearch;

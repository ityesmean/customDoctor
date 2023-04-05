/* eslint-disable no-restricted-syntax */
/* eslint-disable no-else-return */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-concat */
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import BackButton from '../../components/common/BackButton';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';

import { hospitalSearchSelectedOption, myPositionState } from '../../atoms';
import { API_URL_HOSPITAL } from '../../api/api';

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
  margin-top: 1vh;
  margin-bottom: 3vh;
`;

const SOption = styled.div`
  padding: 4.2vw;
`;
const SMedicalDepartmentLabel = styled.label`
  display: block;
  width: 20vw;
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 0.6em;
  padding-right: 0.6em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  text-align: center;
  font-size: 0.9em;
`;

const SMedicalDepartmentInput = styled.input.attrs({ type: 'checkbox' })`
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
  padding-left: 0.6em;
  padding-right: 0.6em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  text-align: center;
  font-size: 0.9em;
`;

const SNightOrDayoffInput = styled.input.attrs({ type: 'checkbox' })`
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

const SDistanceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1vh;
  margin-bottom: 3vh;
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

const SDistanceLabel = styled.label`
  display: block;
  width: 20vw;
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  padding-left: 0.6em;
  padding-right: 0.6em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  text-align: center;
  font-size: 0.9em;
`;

const SDistanceInput = styled.input.attrs({ type: 'radio' })`
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
  &:checked + ${SDistanceLabel} {
    background: #00c192;
    color: #fff;
  }
  display: none;
`;

function HospitalSearch() {
  const navigate = useNavigate();

  const [myPosition, setMyPosition] = useRecoilState(myPositionState);
  const [searchWord, setSearchWord] = useState('');
  const [selectedOption, setSelectedOption] = useRecoilState(
    hospitalSearchSelectedOption,
  );

  const medicalDepartment = [
    ['내과', 1],
    ['소아과', 11],
    ['치과', 49],
    ['외과', 4],
    ['피부과', 14],
    ['신경과', 2],
    ['정형외과', 5],
    ['신경외과', 6],
    ['산부인과', 10],
    ['비뇨기과', 15],
    ['성형외과', 8],
    ['이비인후과', 13],
    ['가정의학과', 23],
    ['마취통증과', 9],
    ['정신의학과', 3],
    ['한의원', 100],
  ];

  const nightOrDayoff = [
    ['토요일진료', 1],
    ['일요일진료', 2],
    ['공휴일진료', 3],
    ['야간 / 휴일', 4],
  ];

  const [checkedMedicalDepartments, setCheckedMedicalDepartments] = useState(
    [],
  );
  const [checkedTimeOptions, setCheckedTimeOptions] = useState([]);

  // 진료과목 선택시 실행되는 함수
  const handleCheckedMedicalDepartment = e => {
    // 체크 시 state에 추가
    if (e.currentTarget.checked) {
      if (checkedMedicalDepartments.length >= 5) {
        alert('5개 까지만 선택이 가능합니다.');
        return;
      }
      setCheckedMedicalDepartments([
        ...checkedMedicalDepartments,
        Number(e.target.value),
      ]);
    } else {
      // 체크 해제시 state에서 제거
      setCheckedMedicalDepartments(
        checkedMedicalDepartments.filter(
          element => element !== Number(e.target.value),
        ),
      );
    }
  };

  // 진료 시간 분류 선택시 실행되는 함수
  const handleSelectedNightOrDayoff = e => {
    // 체크 시 state에 추가
    if (e.currentTarget.checked) {
      setCheckedTimeOptions([...checkedTimeOptions, Number(e.target.value)]);
    } else {
      // 체크 해제시 state에서 제거
      setCheckedTimeOptions(
        checkedTimeOptions.filter(
          element => element !== Number(e.target.value),
        ),
      );
    }
  };

  // 검색 버튼 클릭시 실행되는 함수
  const handleSearch = () => {
    const options = [];

    if (
      checkedMedicalDepartments.length === 0 &&
      checkedTimeOptions.length === 0
    ) {
      alert(`항목을 선택해주세요.`);
      return;
    }
    if (checkedMedicalDepartments.length === 0) {
      options.push([0]);
      options.push(checkedTimeOptions);
    } else if (checkedTimeOptions.length === 0) {
      options.push(checkedMedicalDepartments);
      options.push([0]);
    } else {
      options.push(checkedMedicalDepartments);
      options.push(checkedTimeOptions);
    }

    setSelectedOption(options);

    // 옵션 없는 값 검사하고 통과시 검색 결과로 이동
    navigate('/hospital/search/result', {
      state: { type: 'option', value: options, selected: 'standard' },
    });
  };

  const onChangeSearchWordHandler = temp => {
    setSearchWord(temp);
  };

  return (
    <>
      <Header />
      <SLink to="/">
        <BackButton />
      </SLink>
      <STitle>병원명으로 검색</STitle>
      <SearchBar searchType="hospital" />

      <SLine> </SLine>

      <STitle>조건으로 검색</STitle>
      <SSubTitle>진료과목</SSubTitle>
      <SMedicalDepartmentBox>
        {medicalDepartment.map(value => (
          <SOption key={`${value}` + '진료과목'}>
            <SMedicalDepartmentInput
              type="checkbox"
              value={value[1]}
              checked={checkedMedicalDepartments.includes(Number(value[1]))}
              onChange={handleCheckedMedicalDepartment}
              name="filter"
              id={`${value}` + '진료과목'}
            />
            <SMedicalDepartmentLabel htmlFor={`${value}` + '진료과목'}>
              {value[0]}
            </SMedicalDepartmentLabel>
          </SOption>
        ))}
      </SMedicalDepartmentBox>

      <SSubTitle>야간 / 휴일</SSubTitle>
      <SNightOrDayoffBox>
        {nightOrDayoff.map(value => (
          <SOption key={`${value}` + '진료시간'}>
            <SNightOrDayoffInput
              type="checkbox"
              value={value[1]}
              checked={checkedTimeOptions.includes(value[1]) ? true : false}
              onChange={handleSelectedNightOrDayoff}
              name="filter2"
              id={`${value}` + '진료시간'}
            />
            <SNightOrDayoffLabel htmlFor={`${value}` + '진료시간'}>
              {value[0]}
            </SNightOrDayoffLabel>
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

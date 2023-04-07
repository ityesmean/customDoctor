import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/common/Header';
import HospitalList from '../../components/hospital/HospitalList';
import BackButton from '../../components/common/BackButton';

import {
  hospitalSearchSelectedOption,
  myPositionState,
  searchOptionState,
} from '../../atoms';
import SearchBar from '../../components/common/SearchBar';

const SLink = styled(Link)`
  text-decoration: none;
`;

const SFilterBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  margin-top: 3vh;
  margin-bottom: 2vh;
  padding-left: 3vw;
  padding-right: 3vw;
`;

const SOption = styled.div`
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const SLabel = styled.label`
  background-color: #f1f3f4;
  border-radius: 100px;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  padding-left: 3vw;
  padding-right: 3vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const SOptions = styled.label`
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
  padding-left: 2vw;
  padding-right: 2vw;
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

const SToggle = styled.input.attrs({ type: 'checkbox' })`
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

const SButton = styled.input.attrs({ type: 'button' })`
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
  height: 0.5vh;
  background-color: #f1f3f4;
`;

const SOpen = styled.div`
  height: 0.1vh;
  background-color: #f1f3f4;
  margin-top: -1vh;
  margin-bottom: 1vh;
  text-align: center;
  line-height: 0.1vh;
`;

const SClose = styled.div`
  height: 0.1vh;
  background-color: #f1f3f4;
  margin-top: 2vh;
  margin-bottom: 1vh;
  text-align: center;
  line-height: 0.1vh;
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

const SOptionFilter = styled.div`
  padding: 4.2vw;
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

function HospitalSearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const myPosition = useRecoilValue(myPositionState);

  // 후에 지도에서 위치 이동했을대 병원 재검색 하기위해 옵션 Recoil에 저장
  const [searchOption, setSearchOption] = useRecoilState(searchOptionState);
  console.log(searchOption);
  const searchType = location.state.type;
  const searchValue = location.state.value;
  // const option = ['거리순', '별점순', '영업중'];
  const [selectedValue, setSelectedValue] = useState(location.state.selected);
  const [isOnValue, setIsOnValue] = useState(false);
  const [firstOption, setFirstOption] = useState(true);
  const [thisOptionList, setThisOptionList] = useState();
  const [thisOption, setThisOption] = useState();
  const [filterOn, setFilterOn] = useState(false);

  const [checkedMedicalDepartments, setCheckedMedicalDepartments] = useState(
    [],
  );
  const [checkedTimeOptions, setCheckedTimeOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useRecoilState(
    hospitalSearchSelectedOption,
  );

  useEffect(() => {
    setThisOptionList(false);
    setThisOption(false);
    setFilterOn(false);
    setFirstOption(true);
    setIsOnValue(false);
    setCheckedMedicalDepartments([]);
    setCheckedTimeOptions([]);
  }, [searchValue]);

  const handleSelectedValue = e => {
    setSelectedValue(e.target.value);
  };

  const handleIsOnValue = () => {
    setIsOnValue(!isOnValue);
  };

  const handleFirstOptionValue = () => {
    setFirstOption(!firstOption);
  };

  const hadleShowFilter = () => {
    setFilterOn(!filterOn);
  };

  const optionList = [
    { name: '전체보기', value: 'standard', fullname: '전체보기' },
    { name: '1km', value: 'distance1', fullname: '1km 이내' },
    { name: '2km', value: 'distance2', fullname: '2km 이내' },
    { name: '3km', value: 'distance3', fullname: '3km 이내' },
  ];

  useEffect(() => {
    setThisOptionList(optionList.filter(o => o.value !== selectedValue));
    setThisOption(optionList.filter(o => o.value === selectedValue));
  }, [selectedValue, searchValue]);

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
    console.log(selectedOption);

    // 옵션 없는 값 검사하고 통과시 검색 결과로 이동
    navigate('/hospital/search/result', {
      state: { type: 'option', value: options, selected: 'standard' },
    });
  };
  useEffect(() => {
    setSearchOption([searchType, searchValue]);
  }, []);

  return (
    <>
      <Header />
      <SLink to="/hospital/search">
        <BackButton />
      </SLink>
      <SearchBar searchType="hospital" />
      {!filterOn && (
        <SOpen onClick={hadleShowFilter}>진료과목, 야간/휴일 검색 ▼</SOpen>
      )}

      {filterOn && (
        <>
          <SOpen onClick={hadleShowFilter}>진료과목, 야간/휴일 검색 ▲</SOpen>
          <SSubTitle>진료과목</SSubTitle>
          <SMedicalDepartmentBox>
            {medicalDepartment.map(value => (
              <SOptionFilter key={`${value} + 진료과목`}>
                <SMedicalDepartmentInput
                  type="checkbox"
                  value={value[1]}
                  checked={checkedMedicalDepartments.includes(Number(value[1]))}
                  onChange={handleCheckedMedicalDepartment}
                  name="filter"
                  id={`${value} + 진료과목`}
                />
                <SMedicalDepartmentLabel htmlFor={`${value} + 진료과목`}>
                  {value[0]}
                </SMedicalDepartmentLabel>
              </SOptionFilter>
            ))}
          </SMedicalDepartmentBox>

          <SSubTitle>야간 / 휴일</SSubTitle>
          <SNightOrDayoffBox>
            {nightOrDayoff.map(value => (
              <SOptionFilter key={`${value} + 진료시간`}>
                <SNightOrDayoffInput
                  type="checkbox"
                  value={value[1]}
                  checked={checkedTimeOptions.includes(value[1])}
                  onChange={handleSelectedNightOrDayoff}
                  name="filter2"
                  id={`${value} + 진료시간`}
                />
                <SNightOrDayoffLabel htmlFor={`${value} + 진료시간`}>
                  {value[0]}
                </SNightOrDayoffLabel>
              </SOptionFilter>
            ))}
          </SNightOrDayoffBox>

          <SButtonWrapper>
            <SSearchButton onClick={handleSearch}>검 색</SSearchButton>
          </SButtonWrapper>

          <SClose onClick={hadleShowFilter}>진료과목, 야간/휴일 검색 ▲</SClose>
        </>
      )}

      <SFilterBox>
        {firstOption && (
          <SOption key="거리순보기">
            <SButton
              type="button"
              onClick={handleFirstOptionValue}
              value="firstOption"
              name="filter"
              id="거리순보기"
            />
            <SLabel htmlFor="거리순보기">거리순보기</SLabel>
          </SOption>
        )}
        {!firstOption && (
          <SOption key="전체보기">
            {thisOption.map((option, index) => (
              <>
                <SInput
                  value={option.value}
                  name="filter"
                  id={option.name}
                  key={option.name}
                  index={index}
                  defaultChecked
                />
                <SLabel htmlFor={option.name}>{option.fullname}</SLabel>
              </>
            ))}
            {thisOptionList.map((option, index) => (
              <>
                <SInput
                  type="radio"
                  onClick={handleSelectedValue}
                  value={option.value}
                  name="filter"
                  id={option.name}
                  key={option.name}
                  index={index}
                />
                <SOptions htmlFor={option.name}>{option.name}</SOptions>
              </>
            ))}
          </SOption>
        )}
        <SOption key="진료중">
          <SToggle
            type="checkbox"
            onChange={handleIsOnValue}
            value="isOn"
            name="filter"
            id="진료중"
          />
          <SLabel htmlFor="진료중">진료중</SLabel>
        </SOption>
      </SFilterBox>

      <SLine> </SLine>
      <HospitalList
        selectedValue={selectedValue}
        isOnValue={isOnValue}
        searchType={searchType}
        searchValue={searchValue}
        myPosition={myPosition}
      />
    </>
  );
}

export default HospitalSearchResult;

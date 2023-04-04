import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/common/Header';
import HospitalList from '../../components/hospital/HospitalList';
import BackButton from '../../components/common/BackButton';
import Vec from '../../assets/Vector.svg';

import { myPositionState } from '../../atoms';

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
  width: 70vw;
  height: 10vw;
  padding-left: 5vw;
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
  height: 1vh;
  background-color: #f1f3f4;
`;

function HospitalSearchResult() {
  const location = useLocation();

  const myPosition = useRecoilValue(myPositionState);
  const searchType = location.state.type;
  const searchValue = location.state.value;
  // const option = ['거리순', '별점순', '영업중'];
  const [selectedValue, setSelectedValue] = useState('standard');
  const [isOnValue, setIsOnValue] = useState(false);
  const [firstOption, setFirstOption] = useState(true);
  const [thisOptionList, setThisOptionList] = useState();
  const [thisOption, setThisOption] = useState();

  const handleSelectedValue = e => {
    setSelectedValue(e.target.value);
  };

  const handleIsOnValue = () => {
    setIsOnValue(!isOnValue);
  };

  const handleFirstOptionValue = () => {
    setFirstOption(!firstOption);
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
  }, [selectedValue]);

  return (
    <>
      <Header />
      <SLink to="/hospital/search">
        <BackButton />
      </SLink>
      <SSearchContainer>
        <SLink to="/hospital/search">
          <SSearchInput placeholder="다시 검색하기" />
          <SSearchButton>
            <img src={Vec} alt="search" />
          </SSearchButton>
        </SLink>
      </SSearchContainer>
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

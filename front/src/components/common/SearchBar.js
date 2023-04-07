/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Vec from '../../assets/Vector.svg';

import { API_URL_DRUG, API_URL_HOSPITAL } from '../../api/api';
import {
  medicineSearchResult,
  myPositionState,
  hospitalSearchResultState,
} from '../../atoms';

const SSearchContainer = styled.div`
  width: 100vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
  /* align-items: center; */
`;

const SSearchInput = styled.input`
  &:focus {
    outline-color: #00c192;
  }
  width: 70vw;
  height: 10vw;
  font-size: 5vw;
  padding-left: 5vw;
  border: solid 1px #00c192;
  border-radius: 10vw;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const SSearchBtn = styled.button`
  /* type: 'button'; */
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

const SSearchForm = styled.form``;

function SearchBar({ searchType }) {
  const [myPosition, setMyPosition] = useRecoilState(myPositionState);
  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );

  useEffect(() => {
    // 1km 당 위도
    const latPerKm = 0.0091;
    const lngPerKm = 0.0113;

    // 본인의 위도, 경도 위치 가져오기 성공할때 실행되는 함수
    const successLocation = position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const myTempEast = lng + latPerKm * 5;
      const myTempWest = lng - latPerKm * 5;
      const myTempSouth = lat - lngPerKm * 5;
      const myTempNorth = lat + lngPerKm * 5;

      console.log(lat, lng, '1');

      const myPositions = [];
      myPositions.push(
        lat,
        lng,
        myTempEast,
        myTempWest,
        myTempSouth,
        myTempNorth,
      );
      // console.log(myPositions);
      setMyPosition(myPositions);
    };

    // 본인의 위도, 경도 위치 가져오기 실패할때 실행되는 함수
    const failLocation = () => {
      alert('위치 불러오기 실패');
    };

    // 본인의 위도, 경도 위치 가져오기
    navigator.geolocation.getCurrentPosition(successLocation, failLocation);
  }, []);

  const navigate = useNavigate();
  const searchCategory = searchType;
  // const [inputPlaceholder, setInputPlaceholder] = useState({searchType === 'hospital' ? '병원명을 입력해 주세요.' : '약 이름을 검색해 주세요.'});

  const [medicineList, setMedicineList] = useRecoilState(medicineSearchResult);
  const [inputValue, setInputValue] = useState('');
  const onChangeSearch = e => {
    // console.log('INPUT', inputValue);
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.length < 2) {
      alert(`두 글자 이상 검색해주세요.`);
      return;
    }
    if (searchCategory === 'hospital') {
      navigate('/hospital/search/result', {
        state: {
          type: 'keyWord',
          value: inputValue,
          selected: 'standard',
        },
      });
      setInputValue('');
    } else if (searchCategory === 'drug') {
      axios
        .get(`${process.env.REACT_APP_API_URL}/drug/name/${inputValue}`)
        .then(res => {
          setMedicineList(res.data.data);
          setInputValue('');
          navigate('/pill/result');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <SSearchContainer>
      <SSearchForm onSubmit={handleSubmit}>
        <SSearchInput
          value={inputValue}
          onChange={onChangeSearch}
          placeholder="검색어를 입력해주세요."
        />
      </SSearchForm>

      <SSearchBtn onClick={handleSubmit}>
        {/* <div> */}
        <img src={Vec} alt="" />
      </SSearchBtn>
    </SSearchContainer>
  );
}

SearchBar.propTypes = {
  searchType: PropTypes.string,
};

SearchBar.defaultProps = {
  searchType: null,
};
export default SearchBar;

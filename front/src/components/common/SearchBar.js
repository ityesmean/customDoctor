/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Vec from '../../assets/Vector.svg';

import { API_URL_DRUG, API_URL_HOSPITAL } from '../../api/api';
import { medicineSearchResult } from '../../atoms';

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
    // console.log(typeof inputValue);

    if (searchCategory === 'hospital') {
      axios
        .get(`${API_URL_HOSPITAL}/search/${inputValue}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else if (searchCategory === 'drug') {
      axios
        .get(`${API_URL_DRUG}/${inputValue}`)
        .then(res => {
          setMedicineList(res.data.data);
          setInputValue('');
          navigate('/pill/result');
          // console.log(res.data.data[0]);
        })
        .catch(err => console.log(err));
    }

    setInputValue('');
  };

  return (
    <SSearchContainer>
      <SSearchForm onSubmit={handleSubmit}>
        <SSearchInput
          value={inputValue}
          onChange={onChangeSearch}
          placeholder="검색해 주세요."
          ㅠㅁㅊ
          autoFocus
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

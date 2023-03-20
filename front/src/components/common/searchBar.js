import React, { useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import Vec from '../../assets/Vector.svg';

const SearchContainer = styled.div`
  width: 90vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  /* type: 'text'; */
  width: 65vw;
  height: 10vw;
  border: solid 1px #00c192;
  border-radius: 10vw;
  padding-left: 5vw;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const SearchBtn = styled.button`
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

const SearchForm = styled.form``;

function searchBar() {
  const [inputValue, setInputValue] = useState('');
  const onChangeSearch = e => {
    setInputValue(e.target.value);
    // console.log('INPUT', inputValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(inputValue);
    setInputValue('');
  };

  const OnSubmit = () => {
    // console.log(inputValue);
    setInputValue('');
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          value={inputValue}
          onChange={onChangeSearch}
          placeholder="병원명을 입력하세요."
          autoFocus
        />
      </SearchForm>

      <SearchBtn onClick={OnSubmit}>
        {/* <div> */}
        <img src={Vec} alt="" />
      </SearchBtn>
    </SearchContainer>
  );
}
export default searchBar;

import React, { useState } from 'react';
import styled from 'styled-components';

import HospitalList from '../components/common/HospitalList';

const SFilterBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
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

function HospitalSearchResult() {
  const option = ['거리순', '별점순', '영업중'];
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectedValue = e => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
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

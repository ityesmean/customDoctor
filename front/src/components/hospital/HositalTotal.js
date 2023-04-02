/* eslint-disable no-plusplus */
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hospitalBasicState } from '../../atoms';

import HospitalTab from './HospitalTab';

const SContainer = styled.div``;

const STitleBox = styled.div`
  display: flex;
  font-size: x-large;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const STitle = styled.div`
  font-weight: bold;
`;
const SDepartment = styled.div`
  width: 80vw;
`;

const SListText = styled.div`
  display: inline-block;
  font-size: small;
  color: gray;
  /* background-color: #eef1fd; */
  padding: 1vw 1vw;
  /* margin: 1vw 1vw; */
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
`;

function HositalTotal() {
  const basicInfo = useRecoilValue(hospitalBasicState);

  const departmentList = [];
  for (let i = 0; i < basicInfo.hospitalPart.length; i++) {
    if (i % 2 === 0) {
      departmentList.push(basicInfo.hospitalPart[i]);
    }
  }
  return (
    <SContainer>
      <STitleBox>
        <STitle>{basicInfo.hospitalName}</STitle>
        <SDepartment>
          {departmentList.map(dep => (
            <SListText>{dep}</SListText>
          ))}
        </SDepartment>
      </STitleBox>
      <SLine />
      <HospitalTab />
    </SContainer>
  );
}

export default HositalTotal;

import React from 'react';
import styled from 'styled-components';
import HospitalSpecialVote from './HospitalSpecialVote';

const SgraphContainer = styled.div``;

function HospitalSpecialInfo() {
  const headers = [
    {
      text: '의료장비명',
      value: 'Name',
    },
    {
      text: '장비대수',
      value: 'Count',
    },
  ];

  const items = [
    {
      Name: '유방촬영장치',
      Count: 2,
    },
    {
      Name: 'CT',
      Count: 1,
    },
    {
      Name: '골밀도검사기',
      Count: 3,
    },
    {
      Name: '초음파영상진단기',
      Count: 2,
    },
  ];

  return (
    <SgraphContainer>
      <HospitalSpecialVote headers={headers} items={items} />
    </SgraphContainer>
  );
}

export default HospitalSpecialInfo;

/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import styled from 'styled-components';

const SDeleteWrapper = styled.div``;

const SDelete = styled.div`
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 1vw;
`;

function HospitalDeleteButton() {
  return (
    <>
      <SDeleteWrapper>
        <SDelete>삭제</SDelete>
      </SDeleteWrapper>
    </>
  );
}

export default HospitalDeleteButton;

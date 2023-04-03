import React from 'react';
import styled from 'styled-components';
import Back from '../../assets/Back.png';

const SBack = styled.img`
  width: 8vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 3vw;
`;

function BackButton() {
  return <SBack src={Back} alt="Back" />;
}

export default BackButton;

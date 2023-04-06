/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import MyBasketButton from '../../assets/MyBasketButton.png';

import { myBasketState } from '../../atoms';

const SMyBasketButtonImg = styled.img`
  width: 10vw;
  height: 10vw;
  margin-top: 1vh;
  margin-right: 3vw;
`;

function MyPageBasketButton({ drugName }) {
  const [myBasket, setMyBasket] = useRecoilState(myBasketState);
  console.log(drugName);

  const willAddDrug = {
    name: drugName,
    isChecked: 'unChecked',
  };
  const onClickAddDrugHandler = () => {
    const temp = JSON.parse(JSON.stringify([...myBasket]));
    setMyBasket([...temp, willAddDrug]);
    alert('약이 추가되었습니다.');
  };

  return (
    <SMyBasketButtonImg src={MyBasketButton} onClick={onClickAddDrugHandler} />
  );
}

export default MyPageBasketButton;

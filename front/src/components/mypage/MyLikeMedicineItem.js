/* eslint-disable prefer-const */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deleteMyBasketSelector, checkMyBasketSelector } from '../../atoms';


const SItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4vh;
`;

const SCheckboxAndLabelBox = styled.div`
  display: flex;
  align-items: center;
`;

const SLabel = styled.label`
  margin-left: 2vw;
`;

const SDeleteButton = styled.div`
  color: #bdbdbd;
  border: 1px solid #bdbdbd;
  padding: 1vw;
  border-radius: 10px;
`;

function MyLikeMedicineItem({ medicine }) {

  const [myBasket, setMyBasket] = useRecoilState(deleteMyBasketSelector)
  const [myBasketCheck, setMyBasketCheck] = useRecoilState(checkMyBasketSelector)
  // const [myBasketCheck, setMyBasketCheck] = useRecoilState(checkMyBasketSelector)

  const onChangeCheckHandler = () => {
    setMyBasketCheck(medicine)
  }

  const onClickDeleteHandler = () => {
    setMyBasket(medicine)
  }

  return (
    <SItem>
      <SCheckboxAndLabelBox>
        <input
          type="checkbox"
          id={medicine.name}
          onChange={onChangeCheckHandler}
        />
        <SLabel htmlFor={medicine.name}>{medicine.name}</SLabel>
      </SCheckboxAndLabelBox>
      <SDeleteButton onClick={onClickDeleteHandler}>삭제</SDeleteButton>
    </SItem>
  );
}

MyLikeMedicineItem.propTypes = {
  medicine: PropTypes.shape({
    name: PropTypes.string,
    isChecked: PropTypes.string
  })
}

MyLikeMedicineItem.defaultProps = {
  medicine: null,
}


export default MyLikeMedicineItem;

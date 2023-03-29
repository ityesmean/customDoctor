/* eslint-disable eqeqeq */
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
import { deleteMyBasketSelector } from '../../atoms';


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

function MyLikeMedicineItem({ medicine, onChangeCheckHandler, onClickDeleteHandler }) {

  const [myBasket, setMyBasket] = useRecoilState(deleteMyBasketSelector)
  // const [myBasketCheck, setMyBasketCheck] = useRecoilState(checkMyBasketSelector)
  // const [myBasketCheck, setMyBasketCheck] = useRecoilState(checkMyBasketSelector)
  const [bChecked, setChecked] = useState(
    medicine.isChecked === 'unChecked' ? false : true,
  );

  const onClickDeleteItem = () => {
    onClickDeleteHandler(medicine)
  }

  const onChangeCheckItem = () => {
    setChecked(!bChecked)
    onChangeCheckHandler(medicine)
  }



  return (
    <SItem>
      <SCheckboxAndLabelBox>
        <input
          type="checkbox"
          id={medicine.name}
          checked={bChecked}
          onChange={onChangeCheckItem}
        />
        <SLabel htmlFor={medicine.name}>{medicine.name}</SLabel>
      </SCheckboxAndLabelBox>
      <SDeleteButton onClick={onClickDeleteItem}>삭제</SDeleteButton>
    </SItem>
  );
}

MyLikeMedicineItem.propTypes = {
  medicine: PropTypes.shape({
    name: PropTypes.string,
    isChecked: PropTypes.string
  }),
  onChangeCheckHandler: PropTypes.func,
  onClickDeleteHandler: PropTypes.func
}

MyLikeMedicineItem.defaultProps = {
  medicine: null,
  onChangeCheckHandler: null,
  onClickDeleteHandler: null,
}


export default MyLikeMedicineItem;

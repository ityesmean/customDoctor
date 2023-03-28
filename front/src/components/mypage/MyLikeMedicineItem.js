/* eslint-disable no-else-return */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

function MyLikeMedicineItem({
  medicine,
  temp,
  checkedItemHandler,
  deleteItemHandler,
}) {
  const [bChecked, setChecked] = useState(
    medicine.isChecked === 'unChecked' ? false : true,
  );

  // const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(medicine.name, target.checked);
  };

  // 약 삭제 버튼 누르면 실행되는 함수
  const onClickDeleteDrugHandler = () => {
    deleteItemHandler(medicine.name);
  };

  return (
    <SItem>
      <SCheckboxAndLabelBox>
        <input
          type="checkbox"
          id={temp}
          checked={bChecked}
          onChange={e => checkHandler(e)}
        />
        <SLabel htmlFor={temp}>{medicine.name}</SLabel>
      </SCheckboxAndLabelBox>
      <SDeleteButton onClick={onClickDeleteDrugHandler}>삭제</SDeleteButton>
    </SItem>
  );
}

MyLikeMedicineItem.propTypes = {
  medicine: PropTypes.shape({
    name: PropTypes.string,
    isChecked: PropTypes.string,
  }),
  temp: PropTypes.string,
  checkedItemHandler: PropTypes.func,
  deleteItemHandler: PropTypes.func,
};

MyLikeMedicineItem.defaultProps = {
  medicine: null,
  temp: null,
  checkedItemHandler: null,
  deleteItemHandler: null,
};

export default MyLikeMedicineItem;

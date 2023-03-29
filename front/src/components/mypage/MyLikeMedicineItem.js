/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SItem = styled.div`
  margin-bottom: 4vh;
`;
const SLabel = styled.label`
  margin-left: 2vw;
`;

function MyLikeMedicineItem({ medicine, temp, checkedItemHandler }) {
  const [bChecked, setChecked] = useState(
    medicine.isChecked === 'unChecked' ? false : true,
  );

  // const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(medicine.name, target.checked);
  };

  return (
    <SItem>
      {/* <div>{medicine}</div> */}
      <input
        type="checkbox"
        id={temp}
        checked={bChecked}
        onChange={e => checkHandler(e)}
      />
      <SLabel htmlFor={temp}>{medicine.name}</SLabel>
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
};

MyLikeMedicineItem.defaultProps = {
  medicine: null,
  temp: null,
  checkedItemHandler: null,
};

export default MyLikeMedicineItem;

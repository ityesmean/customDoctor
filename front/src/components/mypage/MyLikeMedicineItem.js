import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';


const SItem = styled.div`
    margin-bottom: 4vh;
`
const SLabel = styled.label`
    margin-left: 2vw;
`

function MyLikeMedicineItem({ medicine, index, checkedItemHandler }) {

    const [bChecked, setChecked] = useState(false);

    const checkHandler = ({ target }) => {
        setChecked(!bChecked);
        checkedItemHandler(medicine.name, target.checked);
    };

    return (
        <SItem>
            <input type="checkbox" id={index} checked={bChecked} onChange={(e) => checkHandler(e)} />
            <SLabel htmlFor={index}>{medicine.name}</SLabel>
        </SItem>
    )
}

MyLikeMedicineItem.propTypes = {
    medicine: PropTypes.shape({
        name: PropTypes.string,
    }),
    index: PropTypes.number,
    checkedItemHandler: PropTypes.func,
}

MyLikeMedicineItem.defaultProps = {
    medicine: null,
    index: null,
    checkedItemHandler: null,
}

export default MyLikeMedicineItem;
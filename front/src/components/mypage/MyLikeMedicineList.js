import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { myBasket } from '../../atoms';
import MyLikeMedicineItem from './MyLikeMedicineItem';

function MyLikeMedicineList() {

    const myMedicines = useRecoilValue(myBasket)

    const [checkedItems, setCheckedItems] = useState(new Set());

    console.log(myMedicines)

    const checkedItemHandler = (name, isChecked) => {
        if (isChecked) {
            checkedItems.add(name);
            console.log(checkedItems)
            setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems.has(name)) {
            checkedItems.delete(name);
            console.log(checkedItems)
            setCheckedItems(checkedItems);
        }
    };

    return (
        <>
            {myMedicines.map((medicine, index) => (
                <MyLikeMedicineItem medicine={medicine} index={index} checkedItemHandler={checkedItemHandler} />
            ))}
        </>
    )
}

export default MyLikeMedicineList;
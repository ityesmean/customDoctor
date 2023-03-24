/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { collection, getDocs } from 'firebase/firestore';
import MypageSearch from '../../assets/Mypage/MypageSearch.png';

import { myBasket } from '../../atoms';
import MyLikeMedicineItem from './MyLikeMedicineItem';

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
`;
const SSearchImg = styled.img`
  position: absolute;
  left: 11vw;
  width: 1em;
  z-index: 999;
  margin-top: 1vh;
`;

const SMyMedicineInput = styled.input`
  &::placeholder {
    padding-left: 5vw;
  }
  &:focus {
    outline-color: #00c192;
  }
  position: relative;
  width: 80vw;
  padding: 1vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin-bottom: 3vh;
`;

const SListWrapper = styled.div`
  justify-content: center;
  width: 75vw;
  height: 25vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  justify-content: center;
  padding: 5vw;
  overflow: scroll;
`;

function MyLikeMedicineSearchAndList() {
  const myMedicines = useRecoilValue(myBasket);

  const [checkedItems, setCheckedItems] = useState(new Set());
  const [filteredArr, setFilteredArr] = useState([...myMedicines]);
  const [searchWord, setSearchWord] = useState('');
  //   const [selected, setSelected] = useState([]);

  const handleSearchWord = e => {
    setSearchWord(e.target.value);
    // console.log(filteredArr);
    const result = myMedicines.filter(medicine => {
      if (medicine.name.indexOf(e.target.value) === -1) {
        return false;
      } else {
        return true;
      }
    });
    setFilteredArr(result);
  };

  const checkedItemHandler = (name, isChecked) => {
    if (isChecked) {
      checkedItems.add(name);
      console.log(checkedItems);
      setCheckedItems(checkedItems);
      // 여기에 받은 name을 기준으로 mymedicines 안에 있는 요소를 체크
    } else if (!isChecked && checkedItems.has(name)) {
      checkedItems.delete(name);
      console.log(checkedItems);
      setCheckedItems(checkedItems);
    }
  };

  return (
    <SBox>
      <SInputWrapper>
        {/* placeholder는 input에 값 입력시 사라지지만 img는 사라지지 않으므로 설정 */}
        {searchWord ? null : <SSearchImg src={MypageSearch} />}
        <SMyMedicineInput
          placeholder="바구니에서 약 찾기"
          onChange={handleSearchWord}
        />
      </SInputWrapper>

      <SListWrapper>
        {filteredArr.map(medicine => (
          <MyLikeMedicineItem
            key={medicine.name}
            medicine={medicine}
            temp={medicine.name}
            checkedItemHandler={checkedItemHandler}
          />
        ))}
      </SListWrapper>
    </SBox>
  );
}

export default MyLikeMedicineSearchAndList;

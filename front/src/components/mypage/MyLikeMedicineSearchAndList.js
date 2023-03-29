/* eslint-disable prefer-const */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MyLikeMedicineItem from './MyLikeMedicineItem';

import { myBasketState } from '../../atoms';

import MypageSearch from '../../assets/mypage/MypageSearch.png';

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

function MyLikeMedicineSearchAndList({ likedMedicinesHandler }) {

  const [myBasket, setMyBasket] = useRecoilState(myBasketState)
  const [filteredArr, setFilteredArr] = useState([...myBasket]);
  const [searchWord, setSearchWord] = useState('')
  const [checkedItems, setCheckedItems] = useState(new Set())

  // const [myBasketCheck, setMyBasketCheck] = useRecoilState(checkMyBasketSelector)

  const onChangeSearchWordHandler = e => {
    setSearchWord(e.target.value)

    const result = myBasket.filter((medicine) => {
      if (medicine.name.indexOf(e.target.value) === -1) {
        return false
      } else {
        return true
      }
    })

    setFilteredArr(result)
  }

  const onClickDeleteHandler = (target) => {
    const tempBasket = [...myBasket];
    const newObj = []
    tempBasket.forEach((item) => {
      newObj.push(JSON.parse(JSON.stringify(item)))
    })
    console.log(newObj, 'newObj', '전')
    const deletedArr = newObj.filter((item, index) => {
      console.log(JSON.stringify(item) === JSON.stringify(target))
      if (JSON.stringify(item) === JSON.stringify(target)) {

        return false
      } else {

        return true
      }
    })
    console.log(deletedArr, '후')
    setFilteredArr(deletedArr)
    setMyBasket(deletedArr)
    // location.reload(); 
  }

  const onChangeCheckHandler = (target) => {
    const tempBasket = [...myBasket];
    const newObj = []
    tempBasket.forEach((item) => {
      newObj.push(JSON.parse(JSON.stringify(item)))
    })
    newObj.forEach((item) => {
      if (JSON.stringify(item) === JSON.stringify(target)) {
        console.log('오긴하냐 ?')
        if (item.isChecked === 'unChecked') {
          // console.log('여기로 들어옴1')
          item.isChecked = 'checked'
          checkedItems.add(item.name)
          console.log(checkedItems)
          likedMedicinesHandler(checkedItems)
        } else if (item.isChecked === 'checked') {
          item.isChecked = 'unChecked'
          // console.log('여기로 들어옴1')
          console.log('잇냐')
          checkedItems.delete(item.name)
          console.log(checkedItems)
          likedMedicinesHandler(checkedItems)
        }
      }
    })
    console.log(newObj)
    setFilteredArr(newObj)
    setMyBasket(newObj)
  }

  return (
    <SBox>
      <SInputWrapper>
        {/* placeholder는 input에 값 입력시 사라지지만 img는 사라지지 않으므로 설정 */}
        {searchWord ? null : <SSearchImg src={MypageSearch} />}
        <SMyMedicineInput
          placeholder="바구니에서 약 찾기"
          onChange={onChangeSearchWordHandler}
        />
      </SInputWrapper>

      <SListWrapper>
        {filteredArr.map(medicine => (
          <MyLikeMedicineItem
            key={medicine.name}
            medicine={medicine}
            onChangeCheckHandler={onChangeCheckHandler}
            onClickDeleteHandler={onClickDeleteHandler}
          />
        ))}
      </SListWrapper>
    </SBox>
  );
}

MyLikeMedicineSearchAndList.propTypes = {
  likedMedicinesHandler: PropTypes.func
}

MyLikeMedicineSearchAndList.defaultProps = {
  likedMedicinesHandler: null,
}

export default MyLikeMedicineSearchAndList;

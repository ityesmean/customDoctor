/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MyLikeMedicineItem from './MyLikeMedicineItem';

import { myBasketState, checkedMedicineState } from '../../atoms';

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
    padding-left: 6vw;
  }
  &:focus {
    outline-color: #00c192;
  }
  position: relative;
  width: 80vw;
  padding: 1vh;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 10px;
  border: none;
  margin-bottom: 3vh;
`;

const SListWrapper = styled.div`
  justify-content: center;
  width: 75vw;
  height: 25vh;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 10px;
  justify-content: center;
  padding: 5vw;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5vw;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e2e2e5;
    background-clip: padding-box;
    border: 5px solid transparent;
    border-radius: 5vw;
  }
  &::-webkit-scrollbar-track {
    margin: 1vw;
    background-color: #00ff0000;
    /* padding: 1; */
  }
`;

// function MyLikeMedicineSearchAndList({ likedMedicinesHandler }) {
function MyLikeMedicineSearchAndList() {
  const [myBasket, setMyBasket] = useRecoilState(myBasketState);
  const [filteredArr, setFilteredArr] = useState([...myBasket]);

  const [searchWord, setSearchWord] = useState('');
  const [checkedMedicines, setCheckedMedicines] =
    useRecoilState(checkedMedicineState);

  const onChangeSearchWordHandler = e => {
    setSearchWord(e.target.value);

    // filterdArr 가 랜더링 되기 위해 inputValue에 맞게 filtered Arr State 변경
    const result = myBasket.filter(medicine => {
      if (medicine.name.indexOf(e.target.value) === -1) {
        return false;
      } else {
        return true;
      }
    });

    setFilteredArr(result);
  };

  // 삭제 버튼 눌렀을때 실행되는 함수 (target은 장바구니 내의 해당 medicine)
  const onClickDeleteHandler = target => {
    // atom 직접 참조가 안되기 때문에 깊은 복사로 배열을 새로 만든 후에 filteredArr에 재 할당
    const tempBasket = [...myBasket];

    // 참조해서 값을 바꾸기 위해 newObj를 새로 생성
    const newObj = [];
    tempBasket.forEach(item => {
      newObj.push(JSON.parse(JSON.stringify(item)));
    });

    // newObj에서 지우고 싶은 target과 일치하는 값을 제거하고 deletedArr에 저장
    const deletedArr = newObj.filter(item => {
      if (JSON.stringify(item) === JSON.stringify(target)) {
        const temp = [...checkedMedicines];
        let deletedFilteredArr = temp.filter(element => element !== item.name);
        setCheckedMedicines(deletedFilteredArr);
        return false;
      } else {
        return true;
      }
    });

    // target이 제거된 객체들의 배열을 filteredArr에 저장
    setFilteredArr(deletedArr);

    // recoil에
    setMyBasket(deletedArr);
  };

  // check 이벤트가 발생하면 실행되는 함수 target은 check 이벤트가 발생한 target 약
  const onChangeCheckHandler = target => {
    // recoil내의 내 약 리스트들 깊은 복사
    const tempBasket = [...myBasket];

    // 직접 참조하기 위해 객체 새로 생성
    const newObj = [];
    tempBasket.forEach(item => {
      newObj.push(JSON.parse(JSON.stringify(item)));
    });

    // check event 적용을 위해 순회
    newObj.forEach(item => {
      // 타겟 객체를 찾고
      if (JSON.stringify(item) === JSON.stringify(target)) {
        // 타겟 객체가 unChecked 였다면 checked로 변경
        if (item.isChecked === 'unChecked') {
          item.isChecked = 'checked';
          const temp = [...checkedMedicines];
          temp.push(item.id);
          setCheckedMedicines(temp);
          // 타겟 객체가 checked 였다면 unChecked로 변경
        } else if (item.isChecked === 'checked') {
          item.isChecked = 'unChecked';
          const temp = [...checkedMedicines];
          const filteredCheckedMedicines = temp.filter(
            element => element !== item.id,
          );
          setCheckedMedicines(filteredCheckedMedicines);
        }
      }
    });
    setFilteredArr(newObj);
    setMyBasket(newObj);
  };

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

export default MyLikeMedicineSearchAndList;

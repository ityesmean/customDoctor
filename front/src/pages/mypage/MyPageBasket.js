/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL_DRUG, API_URL_USER } from '../../api/api';

import Header from '../../components/common/Header';
import BackButton from '../../components/common/BackButton';
import MyLikeMedicineSearchAndList from '../../components/mypage/MyLikeMedicineSearchAndList';

import BlackHospital from '../../assets/mypage/BlackHospital.png';
import BlackMedicine from '../../assets/mypage/BlackMedicine.png';
import GreenBasket from '../../assets/mypage/GreenBasket.png';

import { myBasketState, checkedMedicineState } from '../../atoms';

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 2vw 0;
`;

const SImg = styled.img`
  width: 8vw;
  display: flex;
`;

const SText = styled.div``;

const SBoldText = styled.div`
  font-weight: bold;
`;
const SBox = styled.div`
  /* display: flex; */
`;

const SPageBox = styled.div`
  width: 25vw;
  height: 25vw;
  background-color: #f3f6fa;
  border-radius: 15px;
  margin: 5vw 2.5vw 5vw 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SPageSelectBox = styled.div`
  width: 90vw;
  display: flex;
  margin: 0 5vw;
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
`;

const SSubTitle = styled.div`
  font-weight: bold;
  font-size: 7vw;
  margin-left: 8vw;
  margin-top: 3vh;
`;

const SInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
  font-weight: bold;
  font-size: 4vw;
`;

const SBasketName = styled.div``;

const SInputBasketName = styled.input`
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
  margin-top: 1vh;
`;

const SInputTextArea = styled.textarea`
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
  margin-top: 1vh;
  resize: none;
  height: 20vh;
`;

const SSearchButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SCreateBasketButton = styled.button`
  background-color: #00c192;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 10vw;
  padding-right: 10vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 3vh;
`;

function MyPageBasket() {
  const navigate = useNavigate();

  const [myMedicines, setMyMedicines] = useRecoilState(myBasketState);
  const [basketName, setBasketName] = useState('');
  const [basketMemo, setBasketMemo] = useState('');
  // const [likedMedicines, setLikedMedicines] = useState([]);
  const [checkedMedicines, setCheckedMedicine] =
    useRecoilState(checkedMedicineState);

  // 약 봉지 제목 handler
  const onChangeBasketNameHandler = e => {
    setBasketName(e.target.value);
  };
  // 약 메모 Handler
  const onChangeBasketMemoHandler = e => {
    setBasketMemo(e.target.value);
  };
  // 약 체크 Handler
  // const likedMedicinesHandler = medicines => {
  //   setLikedMedicines(medicines);
  // };

  const onClickCreateBasketHandler = async () => {
    // 약을 담지않거나, 제목을 짓지 않았거나, 내용을 입력하지 않았을때 경고창
    if (checkedMedicines.length === 0) {
      alert('약을 담아주세요.');
      return;
    } else if (basketName.length === 0) {
      alert('제목을 입력해 주세요.');
      return;
    } else if (basketMemo.length === 0) {
      alert('내용을 입력해 주세요.');
      return;
    }

    // 체크된 약들 저장한 recoil 초기화
    const clearCheckedMedicineState = () => {
      setCheckedMedicine([]);
    };

    const accessToken = localStorage.getItem('accessToken');

    console.log(accessToken);

    // 체크된 약들 삭제하기 위한 로직
    const tempMedicines = myMedicines.filter(medicine => {
      if (medicine.isChecked === 'unChecked') {
        return true;
      } else {
        return false;
      }
    });

    // 약 봉투 담는 post요청
    axios
      .post(
        `${API_URL_USER}/plus`,
        {
          drugId: checkedMedicines,
          drugMyMemo: basketMemo,
          drugMyTitle: basketName,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(() => {
        // recoil 업데이트
        setMyMedicines(tempMedicines);
        // 체크 리스트 초기화
        clearCheckedMedicineState();
        navigate('/mypage/medicine');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <SLink to="/">
        <BackButton />
      </SLink>
      <SPageSelectBox>
        <SPageBox>
          <SLink to="/mypage/hospitallist">
            <SBox>
              <ImgBox>
                <SImg src={BlackHospital} alt="BlackHospital" />
              </ImgBox>
              <SBoldText>병원리스트</SBoldText>
            </SBox>
          </SLink>
        </SPageBox>
        <SPageBox>
          <SLink to="/mypage/medicine">
            <SBox>
              <ImgBox>
                <SImg src={BlackMedicine} alt="BlackMedicine" />
              </ImgBox>
              <SText>나의 약봉지</SText>
            </SBox>
          </SLink>
        </SPageBox>
        <SPageBox>
          <SBox>
            <ImgBox>
              <SImg src={GreenBasket} alt="GreenBasket" />
            </ImgBox>
            <SText>약 바구니</SText>
          </SBox>
        </SPageBox>
      </SPageSelectBox>
      <SLine />

      <MyLikeMedicineSearchAndList />

      <SSubTitle>약봉지 생성</SSubTitle>

      <SInputWrapper>
        <SBasketName>제목</SBasketName>
        <SInputBasketName
          placeholder="약봉지 제목을 입력해주세요."
          onChange={onChangeBasketNameHandler}
        />

        <SBasketName>메모</SBasketName>
        <SInputTextArea
          placeholder="내용을 입력해 주세요."
          maxLength={250}
          onChange={onChangeBasketMemoHandler}
        />
      </SInputWrapper>

      <SSearchButtonWrapper>
        <SCreateBasketButton type="button" onClick={onClickCreateBasketHandler}>
          생 성
        </SCreateBasketButton>
      </SSearchButtonWrapper>
    </>
  );
}

export default MyPageBasket;

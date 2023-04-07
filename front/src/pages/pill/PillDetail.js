/* eslint-disable prefer-template */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { drugDetailInfo, drugAvoidInfo, myBasketState } from '../../atoms';
import { API_URL_DRUG } from '../../api/api';

import AddBasket from '../../assets/pilldata/AddBasket.png';
import Back from '../../assets/Back.png';

import PillTab from '../../components/pill/PillTab';
import MyPageBasketButton from '../../components/pill/MyPageBasketButton';

const SBack = styled.img`
  width: 8vw;
  margin-left: 2vw;
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const SContainer = styled.div``;

const SHeader = styled.div`
  height: 10vw;
  width: 100%;
  padding: 2vw 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: white;
`;

const SMedicineImg = styled.img`
  width: 100vw;
  height: 30vh;
  padding-top: 15vw;
`;

const SName = styled.div`
  font-size: 6vw;
  font-weight: bold;
  margin: 3vw 0;
  padding-left: 8vw;
`;

const SDetailBox = styled.div``;

const STextBox = styled.div`
  padding-left: 8vw;
`;

const SSmallTextBox = styled.div`
  padding: 2vw 0;
  width: 90%;
`;

const SBoldText = styled.div`
  font-size: 4vw;
  font-weight: bold;
  margin-bottom: 2vw;
  /* font-size: medium; */
`;

const SText = styled.div`
  font-size: 3vw;
  margin-bottom: 2vw;
  /* font-size: small; */
`;

const SLine = styled.div`
  height: 1vh;
  background-color: #f1f3f4;
`;

const SThinLine = styled.div`
  border: solid 1px #f1f3f4;
`;

// const SUnderTab = styled.div``;

function PillDetail() {
  // 약 바구니 recoilState
  const [myBasket, setMyBasket] = useRecoilState(myBasketState);

  // state 받아오기
  const location = useLocation();
  console.log(location.state);
  // 약 상세정보 가져오기
  const [basicInfo, setBasicInfo] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null);
  const [detailPassInfo, setDetailPassInfo] = useRecoilState(drugDetailInfo);
  const [avoidInfo, setAvoidInfo] = useState(null);

  useEffect(() => {
    console.log('here');
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_API_URL}/drug/info/${location.state}`,
        ),
        axios.get(
          `${process.env.REACT_APP_API_URL}/drug/descinfo/${location.state}`,
        ),
        axios.get(
          `${process.env.REACT_APP_API_URL}/drug/avoidinfo/${location.state}`,
        ),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          setBasicInfo(res1.data);
          setDetailInfo(res2.data);
          setDetailPassInfo(res2.data);
          setAvoidInfo(res3.data.data);
        }),
      )
      .catch(error => console.log(error));
  }, []);
  return (
    <SContainer>
      <SHeader>
        <SLink to="/pill/result">
          <SBack src={Back} alt="Back" />
        </SLink>
        <SName>정보</SName>
        {basicInfo && (
          <MyPageBasketButton
            drugName={basicInfo.data.drugName}
            drugId={basicInfo.data.drugId}
          />
        )}
      </SHeader>
      {basicInfo && (
        <SMedicineImg
          src={'https://' + basicInfo.data.drugImg}
          alt={basicInfo.data.drugImg}
        />
      )}
      {basicInfo && detailInfo && avoidInfo ? (
        <SDetailBox>
          <SName>{basicInfo.data.drugName}</SName>
          <SThinLine />
          <STextBox>
            <SSmallTextBox>
              <SBoldText>성분</SBoldText>
              {basicInfo.data.drugIngre !== 'null' ? (
                <SText>{basicInfo.data.drugIngre}</SText>
              ) : (
                <SText>정보없음</SText>
              )}
            </SSmallTextBox>
            <SSmallTextBox>
              <SBoldText>성상</SBoldText>
              <SText>{basicInfo.data.drugColorf}</SText>
            </SSmallTextBox>
            <SSmallTextBox>
              <SBoldText>제형</SBoldText>
              <SText>{basicInfo.data.drugType}</SText>
            </SSmallTextBox>
            <SSmallTextBox>
              <SBoldText>업체명</SBoldText>
              <SText>{detailInfo.data.drugDescCom}</SText>
            </SSmallTextBox>
            <SSmallTextBox>
              <SBoldText>병용금기</SBoldText>
              {avoidInfo.length !== 0 ? (
                avoidInfo.map(avoid => <SText>{avoid.drugAvoidNameB}</SText>)
              ) : (
                <SText>병용금기 없음</SText>
              )}
            </SSmallTextBox>
          </STextBox>
        </SDetailBox>
      ) : (
        <div>약 상세정보 없음</div>
      )}
      <SLine />
      {/* <div>{basicInfo}</div> */}
      {detailInfo && avoidInfo ? (
        <PillTab detailInfo={detailInfo} avoidInfo={avoidInfo} />
      ) : null}
      {/* <PillTab detailInfo={detailInfo} avoidInfo={avoidInfo} /> */}
    </SContainer>
  );
}

export default PillDetail;

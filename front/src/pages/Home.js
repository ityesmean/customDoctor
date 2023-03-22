import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/common/Header';
import HospitalMain from '../assets/HospitalMain.png';
import PillMain from '../assets/PillMain.png';
import MypageMain from '../assets/MypageMain.png';

const SSlogunBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  margin-left: 7vw;
  font-weight: bold;
  font-size: 5vw;
`;

const SSlogun1 = styled.div`
  margin-bottom: 1vh;
`;
const SSlogun2 = styled.div``;

const SButtonBox = styled.div`
  /* margin-top: 10vh; */
  display: flex;
  position: absolute;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  top: 40%;
  left: 0%;
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const SCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  font-weight: bold;
  margin-left: 10vw;
`;
const SSubTitle = styled.div`
  text-align: center;
  text-decoration: none;
  font-size: 4vw;
  margin-top: 2vh;
  font-weight: bold;
  color: black;
`;

const SMypageImg = styled.img``;

function Home() {
  return (
    <>
      <Header />

      <SSlogunBox>
        <SSlogun1>아플 때 언제까지 지도 보고 있을건가요 ?</SSlogun1>
        <SSlogun2>맞닥에서 맞춤 의사를 찾아보세요</SSlogun2>
      </SSlogunBox>

      <SButtonBox>
        <SLink to="/hospital/search">
          <SCardBox>
            <img src={HospitalMain} alt="Hospital" />
            <SSubTitle>병원 검색</SSubTitle>
          </SCardBox>
        </SLink>

        <SCardBox>
          <img src={PillMain} alt="Pill" />
          <SSubTitle>약 검색</SSubTitle>
        </SCardBox>

        <SCardBox>
          <SMypageImg src={MypageMain} alt="Mypage" />
          <SSubTitle>마이페이지</SSubTitle>
        </SCardBox>
      </SButtonBox>
    </>
  );
}

export default Home;

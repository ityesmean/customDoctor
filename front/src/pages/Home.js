import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/common/Header';
import HospitalMain from '../assets/HospitalMain.png';
import PillMain from '../assets/PillMain.png';
import MypageMain from '../assets/MypageMain.png';

import { loginState } from '../atoms';
import Footer from '../components/Footer';

const SSlogunBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  margin-left: 7vw;
  margin-bottom: 25vh;
  font-weight: bold;
  font-size: 5vw;
`;

const SSlogun1 = styled.div`
  margin-bottom: 1vh;
`;
const SSlogun2 = styled.div``;

const SButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const SCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  font-weight: bold;
  margin-left: 2.5vw;
  margin-right: 2.5vw;
`;
const SSubTitle = styled.div`
  text-align: center;
  text-decoration: none;
  font-size: 4vw;
  margin-top: 2vh;
  font-weight: bold;
  color: black;
`;

const SHomeImg = styled.img`
  width: 15vw;
`;

function Home() {
  const isLogin = useRecoilValue(loginState);

  const onClickCheckLoginStatus = e => {
    if (!isLogin) {
      e.preventDefault();
    }
  };

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
            <SHomeImg src={HospitalMain} alt="Hospital" />
            <SSubTitle>병원 검색</SSubTitle>
          </SCardBox>
        </SLink>

        <SLink to="/pill/search">
          <SCardBox>
            <SHomeImg src={PillMain} alt="Pill" />
            <SSubTitle>약 검색</SSubTitle>
          </SCardBox>
        </SLink>

        <SLink to="/mypage/hospitallist" onClick={onClickCheckLoginStatus}>
          <SCardBox>
            <SHomeImg src={MypageMain} alt="Mypage" />
            <SSubTitle>마이페이지</SSubTitle>
          </SCardBox>
        </SLink>
      </SButtonBox>

      <Footer />
    </>
  );
}

export default Home;

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/common/Header';
import HospitalMain from '../assets/HospitalMain.png';
import PillMain from '../assets/PillMain.png';
import MypageMain from '../assets/MypageMain.png';

import { loginState } from '../atoms';

const SMainBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #f1fdfa;
  min-height: 100vh;
`;

const SHeaderBox = styled.div`
  padding-top: 2vh;
  flex-grow: 1;
  margin-bottom: -1vh;
`;

const SFooterBox = styled.div`
  flex-grow: 5;
`;

const SSlogunBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 7vw;
  font-weight: bold;
  font-size: 5vw;
`;

const SSlogun1 = styled.div`
  font-size: 5vw;
`;
const SButtonBox = styled.div`
  flex-grow: 12;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const SLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: flex;
`;

const SCardBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: bold;
  margin-left: 2.5vw;
  margin-right: 2.5vw;

  &:nth-child(1) {
    background: #ddf6ee;
  }
  &:nth-child(3) {
    background: #b7ecdc;
  }
  &:nth-child(2) {
    background: #cff4de;
  }
`;
const SSubTitle = styled.div`
  flex-grow: 15;
  font-size: 5vw;
  color: black;
  display: flex;
  justify-content: end;
  padding-right: 6vw;
  align-items: center;
  font-weight: 400;
`;

const SSubImg = styled.div`
  flex-grow: 1;
  text-align: center;
  padding-left: 5vw;
`;

const SHomeImg = styled.img`
  width: 20vw;
`;

function Home() {
  const isLogin = useRecoilValue(loginState);

  const onClickCheckLoginStatus = e => {
    if (!isLogin) {
      e.preventDefault();
    }
  };

  return (
    <SMainBox>
      <SHeaderBox>
        <Header />
      </SHeaderBox>

      <SSlogunBox>
        <SSlogun1>당신만의 맞춤 닥터</SSlogun1>
      </SSlogunBox>

      <SButtonBox>
        <SCardBox>
          <SLink to="/hospital/search">
            <SSubImg>
              <SHomeImg src={HospitalMain} alt="Hospital" />
            </SSubImg>
            <SSubTitle>이름, 진료과목으로 병원 검색</SSubTitle>
          </SLink>
        </SCardBox>

        <SCardBox>
          <SLink to="/pill/search">
            <SSubImg>
              <SHomeImg src={PillMain} alt="Pill" />
            </SSubImg>

            <SSubTitle>이름, 모양으로 약 검색</SSubTitle>
          </SLink>
        </SCardBox>

        <SCardBox>
          <SLink to="/mypage/hospitallist" onClick={onClickCheckLoginStatus}>
            <SSubImg>
              <SHomeImg src={MypageMain} alt="Mypage" />
            </SSubImg>

            <SSubTitle>즐겨찾기 병원, 복용 약 보러가기</SSubTitle>
          </SLink>
        </SCardBox>
      </SButtonBox>

      <SFooterBox />
    </SMainBox>
  );
}

export default Home;

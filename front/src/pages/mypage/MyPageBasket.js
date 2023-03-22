import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from '../../components/common/Header';
import Back from '../../assets/Back.png';
import BlackHospital from '../../assets/MyPage/BlackHospital.png';
import BlackMedicine from '../../assets/MyPage/BlackMedicine.png';
import GreenBasket from '../../assets/MyPage/GreenBasket.png';

const SLink = styled(Link)`
  text-decoration: none;
`;

const SBack = styled.img`
  width: 8vw;
  margin-bottom: 2vh;
  margin-left: 3vw;
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

function MyPageBasket() {
  return (
    <>
      <Header />
      <SLink to="/">
        <SBack src={Back} alt="Back" />
      </SLink>
      <SPageSelectBox>
        <SLink to="">
          <SPageBox>
            <SBox>
              <ImgBox>
                <SImg src={BlackHospital} alt="BlackHospital" />
              </ImgBox>
              <SBoldText>병원리스트</SBoldText>
            </SBox>
          </SPageBox>
        </SLink>
        <SLink to="">
          <SPageBox>
            <SBox>
              <ImgBox>
                <SImg src={BlackMedicine} alt="BlackMedicine" />
              </ImgBox>
              <SText>나의 약봉지</SText>
            </SBox>
          </SPageBox>
        </SLink>
        <SLink to="">
          <SPageBox>
            <SBox>
              <ImgBox>
                <SImg src={GreenBasket} alt="GreenBasket" />
              </ImgBox>
              <SText>약 바구니</SText>
            </SBox>
          </SPageBox>
        </SLink>
      </SPageSelectBox>
      <SLine />
    </>
  );
}

export default MyPageBasket;

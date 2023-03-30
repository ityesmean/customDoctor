import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PillsAccordian from '../../components/mypage/PillsAccordian';

import BackButton from '../../components/common/BackButton';
import Header from '../../components/common/Header';
import BlackHospital from '../../assets/mypage/BlackHospital.png';
import GreenMedicine from '../../assets/mypage/GreenMedicine.png';
import BlackBasket from '../../assets/mypage/BlackBasket.png';

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

const SText = styled.div`
  /* font-size: 3vw; */
`;

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

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  /* min-height: 100vh; */
`;

const SMenu = styled.div`
  /* padding: 3rem; */
  /* border-radius: 1rem; */
`;

// eslint-disable-next-line no-unused-vars
function MyPageMedicine(props) {
  const pillLists = [
    {
      title: '감기약 처방전',
      pillGroup: [
        { pillTitle: '아토르반정', pillIngre: '아토르바스타틴칼슐' },
        { pillTitle: '에페린정', pillIngre: '에페리손염산염' },
        { pillTitle: '레바미드정', pillIngre: '레바미피드' },
      ],
      memo: '식후 30 분 복용 아침, 점심, 저녁 일 3회',
    },
    {
      title: '감기약 처방전',
      pillGroup: [
        { pillTitle: '아토르반정', pillIngre: '아토르바스타틴칼슐' },
        { pillTitle: '에페린정', pillIngre: '에페리손염산염' },
      ],
      memo: '식후 30 분 복용  일 3회',
    },
  ];

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
              <SText>병원리스트</SText>
            </SBox>
          </SLink>
        </SPageBox>
        <SPageBox>
          <SBox>
            <ImgBox>
              <SImg src={GreenMedicine} alt="GreenMedicine" />
            </ImgBox>
            <SBoldText>나의 약봉지</SBoldText>
          </SBox>
        </SPageBox>
        <SPageBox>
          <SLink to="/mypage/basket">
            <SBox>
              <ImgBox>
                <SImg src={BlackBasket} alt="BlackBasket" />
              </ImgBox>
              <SText>약 바구니</SText>
            </SBox>
          </SLink>
        </SPageBox>
      </SPageSelectBox>
      <SLine />
      <SContainer>
        <SMenu>
          {pillLists ? (
            <>
              {pillLists.map(pilllist => (
                <PillsAccordian data={pilllist} key={pilllist.pillGroup} />
              ))}
            </>
          ) : null}
        </SMenu>
      </SContainer>
    </>
  );
}

export default MyPageMedicine;

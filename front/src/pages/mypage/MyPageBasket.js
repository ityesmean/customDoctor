import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from '../../components/common/Header';
import Back from '../../assets/Back.png';
import MyLikeMedicineList from '../../components/mypage/MyLikeMedicineList';

import BlackHospital from '../../assets/MyPage/BlackHospital.png';
import BlackMedicine from '../../assets/MyPage/BlackMedicine.png';
import GreenBasket from '../../assets/MyPage/GreenBasket.png';
import MypageSearch from '../../assets/MyPage/MypageSearch.png'

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
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

const SInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
`
const SSearchImg = styled.img`
  position: absolute;
  left: 10vw;
  width: 1em;
  z-index: 999;
  margin-top: 1vh;
`

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

const SMedicineListWrapper = styled.div`
  display: flex;
  justify-content: center;
  `;

const SMedicineListBox = styled.div`
  height: 30vh;
  width: 80vw;
  padding: 2.5vw;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: scroll;
  font-weight: bold;
`

const SSubTitle = styled.div`
  font-weight: bold;
  font-size: 7vw;
  margin-left: 8vw;
  margin-top: 3vh;
`

function MyPageBasket() {

  const [searchWord, setSearchWord] = useState('')

  const handleSearchWord = e => {
    setSearchWord(e.target.value)
  }

  return (
    <>
      <Header />
      <SLink to="/">
        <SBack src={Back} alt="Back" />
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

      <SInputWrapper>
        {/* placeholder는 input에 값 입력시 사라지지만 img는 사라지지 않으므로 설정 */}
        {searchWord ? null : (<SSearchImg src={MypageSearch} />)}
        <SMyMedicineInput placeholder='바구니에서 약 찾기' onChange={handleSearchWord} />
      </SInputWrapper>

      <SMedicineListWrapper>
        <SMedicineListBox>
          <MyLikeMedicineList />
        </SMedicineListBox>
      </SMedicineListWrapper>

      <SSubTitle>약봉지 생성</SSubTitle>
    </>
  );
}

export default MyPageBasket;

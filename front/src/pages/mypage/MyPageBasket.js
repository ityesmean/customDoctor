/* eslint-disable no-else-return */
import React from 'react';
// import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from '../../components/common/Header';
import Back from '../../assets/Back.png';
// import MyLikeMedicineList from '../../components/mypage/MyLikeMedicineList';
import MyLikeMedicineSearchAndList from '../../components/mypage/MyLikeMedicineSearchAndList';

import BlackHospital from '../../assets/Mypage/BlackHospital.png';
import BlackMedicine from '../../assets/Mypage/BlackMedicine.png';
import GreenBasket from '../../assets/Mypage/GreenBasket.png';
// import MypageSearch from '../../assets/MyPage/MypageSearch.png';

// import { myBasket } from '../../atoms';

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

const SSubTitle = styled.div`
  font-weight: bold;
  font-size: 7vw;
  margin-left: 8vw;
  margin-top: 3vh;
`;

function MyPageBasket() {
  // const [myMedicines, setMyMedicines] = useRecoilState(myBasket);

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

      {/* <SInputWrapper> */}
      {/* placeholder는 input에 값 입력시 사라지지만 img는 사라지지 않으므로 설정 */}
      {/* {searchWord ? null : <SSearchImg src={MypageSearch} />}
        <SMyMedicineInput
          placeholder="바구니에서 약 찾기"
          onChange={handleSearchWord}
        /> */}
      {/* </SInputWrapper> */}

      {/* <SMedicineListWrapper>
        <SMedicineListBox>
          <MyLikeMedicineList />
        </SMedicineListBox>
      </SMedicineListWrapper> */}

      <div>
        <MyLikeMedicineSearchAndList />
      </div>

      <SSubTitle>약봉지 생성</SSubTitle>
    </>
  );
}

export default MyPageBasket;

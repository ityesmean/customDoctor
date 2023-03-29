import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddBasket from '../../assets/pilldata/AddBasket.png';

import PillTab from '../../components/pill/PillTab';

import Back from '../../assets/Back.png';

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

const SImg = styled.img`
  margin-right: 2vw;
`;

const SMedicineImg = styled.div`
  width: 100vw;
  height: 20vh;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const SBoldText = styled.div`
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 2vw;
  font-size: medium;
`;

const SText = styled.div`
  font-size: 3vw;
  margin-bottom: 2vw;
  font-size: small;
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
  return (
    <SContainer>
      <SHeader>
        <SLink to="/">
          <SBack src={Back} alt="Back" />
        </SLink>
        <SName>정보</SName>
        <SImg src={AddBasket} alt="AddBasket" />
      </SHeader>
      <SMedicineImg>이미지 위치</SMedicineImg>
      <SDetailBox>
        <SName>가나모티에스알정</SName>
        <SThinLine />
        <STextBox>
          <SSmallTextBox>
            <SBoldText>성분</SBoldText>
            <SText>모사</SText>
          </SSmallTextBox>
          <SSmallTextBox>
            <SBoldText>성상</SBoldText>
            <SText>분홍</SText>
          </SSmallTextBox>
          <SSmallTextBox>
            <SBoldText>제형</SBoldText>
            <SText>타원형</SText>
          </SSmallTextBox>
          <SSmallTextBox>
            <SBoldText>업체명</SBoldText>
            <SText>이연제약</SText>
          </SSmallTextBox>
        </STextBox>
      </SDetailBox>
      <SLine />
      <PillTab />
    </SContainer>
  );
}

// PillDetail.proptype = {
//   data: PropTypes.shape({
//     status_code: PropTypes.number,
//     message: PropTypes.string,
//     data: PropTypes.shape({
//       drug_id: PropTypes.number,
//       drug_name: PropTypes.string,
//       drug_img: PropTypes.string,
//       drug_markf: PropTypes.string,
//       drug_markb: PropTypes.string,
//       drug_type: PropTypes.string,
//       drug_colorf: PropTypes.string,
//       drug_colorb: PropTypes.string,
//       drug_line: PropTypes.string,
//       drug_ingre: PropTypes.string,
//     }),
//   }),
// };

// PillDetail.defaultProps = {
//   data: null,
// };

export default PillDetail;

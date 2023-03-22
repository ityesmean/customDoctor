/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import HospitalDeleteButton from '../common/HospitalDeleteButton';

import Star from '../../assets/IsOpen/Star.png';

const SCard = styled.div`
  display: flex;
  margin-top: 3vh;
  margin-bottom: 3vh;
  margin-left: 7vw;
  margin-right: 7vw;
  justify-content: space-between;
`;

const SInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const SHospitalName = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 1vh;
`;

const SMedicalDepartment = styled.div`
  margin-bottom: 1vh;
`;

const SStarAndDistance = styled.div`
  display: flex;
  margin-bottom: 1vh;
`;

const SStar = styled.img`
  width: 3vw;
  height: 3vw;
`;

const SStarScore = styled.div`
  margin-left: 1vw;
  margin-right: 3vw;
`;

const SDistance = styled.div``;

const SAddress = styled.div`
  margin-bottom: 1vh;
`;

const SPhoneNumber = styled.div``;

const SOpenInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20vw;
  text-align: right;
`;

const SRightBox = styled.div`
  display: flex;
  text-align: right;
  margin-left: auto;
`;

const SCircle = styled.div`
  background-color: ${props => (props.color ? '#00C192' : '#F1F3F4')};
  margin-top: 0.1vh;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
`;

const SOpen = styled.div`
  font-weight: bold;
  font-size: 1em;
  margin-left: 1vw;
`;

const SLine = styled.div`
  height: 0.3vh;
  background-color: #f1f3f4;
`;

// const SHospitalInformation = styled.div``;
// const SDetailInformation = styled.div``;
// const SIsOpen = styled.div``;

function HospitalCard({ card }) {
  //   const [IsMyPage, setIsMypage] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <SCard>
        <SInformation>
          <SHospitalName>병원이름 병원이름 병원이름 병원이름</SHospitalName>
          <SMedicalDepartment>{card.medicalDepartment}</SMedicalDepartment>
          <SStarAndDistance>
            <SStar src={Star} alt="Star" />
            <SStarScore>4.5</SStarScore>
            <SDistance>500m</SDistance>
          </SStarAndDistance>
          <SAddress>대전광역시 유성구 궁동</SAddress>
          <SPhoneNumber>012-345-6789</SPhoneNumber>
        </SInformation>
        <SOpenInformation>
          <SRightBox>
            <SCircle color={isOpen}></SCircle>
            <SOpen>진료중</SOpen>
          </SRightBox>
          {/* 로그인 한 유저라면 카드에 삭제버튼 있어야 하므로 현재 페이지가 마이페이지 인가? */}
          {window.location.pathname === '/mypage/hospitallist' ? (
            <HospitalDeleteButton />
          ) : null}
        </SOpenInformation>
      </SCard>
      <SLine> </SLine>
    </>
  );
}

HospitalCard.propTypes = {
  card: PropTypes.shape({
    hospitalName: PropTypes.string,
    medicalDepartment: PropTypes.string,
    distance: PropTypes.number,
    isMeter: PropTypes.bool,
  }),
};

HospitalCard.defaultProps = {
  card: null,
};

export default HospitalCard;

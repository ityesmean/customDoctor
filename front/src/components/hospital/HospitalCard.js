/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Star from '../../assets/isopen/Star.png';

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
  justify-content: center;
  width: 20vw;
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
  // props 에서 mypage인지 여부 전달 받아서 IsMyPage 상태 변경
  return (
    <>
      <SCard>
        <SInformation>
          <SHospitalName>병원이름ddddddddd</SHospitalName>
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
          <SCircle color={isOpen}></SCircle>
          <SOpen>진료중</SOpen>
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

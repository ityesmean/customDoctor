import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SCard = styled.div``;
// const SHospitalInformation = styled.div``;
// const SDetailInformation = styled.div``;
// const SIsOpen = styled.div``;

function HospitalCard({ card, index }) {
  //   const [IsMyPage, setIsMypage] = useState(false);

  // props 에서 mypage인지 여부 전달 받아서 IsMyPage 상태 변경
  return (
    <SCard>
      <div>{index}</div>
      <div>{card.hospitalName}</div>
      <div>{card.medicalDepartment}</div>
      {/* <SHospitalInformation>
        <div>병원명</div>
        <div>진료과목</div>
        <SDetailInformation>
          <div>별</div>
          <div>평점</div>
          <div>거리</div>
        </SDetailInformation>
        <div>주소</div>
        <div>전화번호</div>
      </SHospitalInformation>
      <SIsOpen>
        <div>색깔 동그라미</div>
        <div>진료여부</div>
      </SIsOpen> */}
    </SCard>
  );
}

HospitalCard.propTypes = {
  card: PropTypes.shape({
    hospitalName: PropTypes.string,
    medicalDepartment: PropTypes.string,
    distance: PropTypes.number,
    isMeter: PropTypes.bool,
  }),
  index: PropTypes.number,
};

HospitalCard.defaultProps = {
  card: null,
  index: null,
};

export default HospitalCard;

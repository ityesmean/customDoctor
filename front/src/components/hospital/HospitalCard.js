/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import { API_URL_HOSPITAL } from '../../api/api';

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

const SDistance = styled.div`
  margin-bottom: 1vh;
`;

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

function HospitalCard({ hospital }) {
  const [isOpen, setIsOpen] = useState('true');
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const currentTime = new Date();
  const currentDay = currentTime.getDay();

  const getStartAndEndTime = () => {
    if (currentDay === 0) {
      if (hospital.hospitalTime.hospitalTimeMon !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeMon.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeMon.substr(6, 11));
      }
    } else if (currentDay === 1) {
      if (hospital.hospitalTime.hospitalTimeTue !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeTue.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeTue.substr(6, 11));
      }
    } else if (currentDay === 2) {
      if (hospital.hospitalTime.hospitalTimeWed !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeWed.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeWed.substr(6, 11));
      }
    } else if (currentDay === 3) {
      if (hospital.hospitalTime.hospitalTimeThu !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeThu.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeThu.substr(6, 11));
      }
    } else if (currentDay === 4) {
      if (hospital.hospitalTime.hospitalTimeFri !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeFri.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeFri.substr(6, 11));
      }
    } else if (currentDay === 5) {
      if (hospital.hospitalTime.hospitalTimeSat !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeSat.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeSat.substr(6, 11));
      }
    } else if (currentDay === 6) {
      if (hospital.hospitalTime.hospitalTimeSun !== 'null') {
        setStartTime(hospital.hospitalTime.hospitalTimeSun.substr(0, 5));
        setEndTime(hospital.hospitalTime.hospitalTimeSun.substr(6, 11));
      }
    }
  };

  // 주소를 받아오기 위한 요청
  const getAddress = async () => {
    await axios
      .get(`${API_URL_HOSPITAL}/desc/${hospital.hospitalId}/`)
      .then(res => {
        if (res.data.data.hospitalAdd !== null) {
          setAddress(res.data.data.hospitalAdd);
        } else {
          setAddress(null);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAddress();
    getStartAndEndTime();
  }, []);
  return (
    <>
      {hospital ? (
        <SCard>
          <SInformation>
            <SHospitalName>{hospital.hospitalName}</SHospitalName>
            <SDistance>500m</SDistance>
            {/* 주소 있으면 출력하고 없으면 '주소 정보 없음' 출력 */}
            {address ? (
              <SAddress>{address}</SAddress>
            ) : (
              <SAddress>주소 정보 없음</SAddress>
            )}
            <SPhoneNumber>{hospital.hospitalTel}</SPhoneNumber>
          </SInformation>
          <SOpenInformation>
            <SCircle color={isOpen}></SCircle>
            <SOpen>진료중</SOpen>
          </SOpenInformation>
        </SCard>
      ) : null}
      <SLine> </SLine>
    </>
  );
}

HospitalCard.propTypes = {
  hospital: PropTypes.shape({
    hospitalName: PropTypes.string,
    hospitalCode: PropTypes.string,
    hospitalTel: PropTypes.string,
    hospitalX: PropTypes.number,
    hospitalY: PropTypes.number,
    hospitalTime: {
      hospital_time_id: PropTypes.number,
      hospital: {
        hospital_id: PropTypes.number,
        hospital_name: PropTypes.string,
        hospital_code: PropTypes.string,
        hospital_x: PropTypes.number,
        hospital_y: PropTypes.number,
        hospital_tel: PropTypes.string,
      },
      hospitalTimeMon: PropTypes.string,
      hospitalTimeTue: PropTypes.string,
      hospitalTimeWed: PropTypes.string,
      hospitalTimeThe: PropTypes.string,
      hospitalTimeFri: PropTypes.string,
      hospitalTimeSat: PropTypes.string,
      hospitalTimeSun: PropTypes.string,
      hospitalTimeMonNight: PropTypes.number,
      hospitalTimeTueNight: PropTypes.number,
      hospitalTimeWedNight: PropTypes.number,
      hospitalTimeTheNight: PropTypes.number,
      hospitalTimeFriNight: PropTypes.number,
      hospitalTimeSatNight: PropTypes.number,
      hospitalTimeSunNight: PropTypes.number,
      hospitalTimeHoliday: PropTypes.number,
      hospitalTimeEtc: PropTypes.string,
    },
    hospitalPart: PropTypes.shape([PropTypes.string]),
  }),
};

HospitalCard.defaultProps = {
  hospital: null,
};

export default HospitalCard;

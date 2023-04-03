/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { API_URL_HOSPITAL } from '../../api/api';
import { hospitalDescState, hospitalBasicState } from '../../atoms';
import KakaoMap from '../../components/kakao/KakaoMap';
import HositalTotal from '../../components/hospital/HositalTotal';

const SContainer = styled.div``;

function HospitalDetail() {
  const information = useLocation();
  const { hospitalId } = useParams();
  const { xPosition, yPosition } = information.state.information;
  // console.log(information.state.information);
  const [hospitalDesc, setHospitalDesc] = useRecoilState(hospitalDescState);
  const [hospitalBasic, setHospitalBasic] = useRecoilState(hospitalBasicState);
  // console.log(getBasic);
  const getDesc = async () => {
    await axios
      .get(`${API_URL_HOSPITAL}/desc/${hospitalId}`)
      .then(
        res => setHospitalDesc(res.data.data),
        setHospitalBasic(information.state.information),
        console.log(hospitalDesc, 'desc'),
      )
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getDesc();
  }, []);

  return (
    <SContainer>
      <KakaoMap x={xPosition} y={yPosition} />
      <HositalTotal />
    </SContainer>
  );
}

export default HospitalDetail;

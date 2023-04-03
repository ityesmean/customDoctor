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
  const lat = information.state.information.hospitalY
  const lng = information.state.information.hospitalX
  const [hospitalDesc, setHospitalDesc] = useRecoilState(hospitalDescState);
  const [hospitalBasic, setHospitalBasic] = useRecoilState(hospitalBasicState);



  useEffect(() => {
    axios
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
      <KakaoMap lat={lat} lng={lng} />
    </SContainer>
  );
}

export default HospitalDetail;

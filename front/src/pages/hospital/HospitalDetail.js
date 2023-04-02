/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { API_URL_HOSPITAL } from '../../api/api';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { hospitalDescState, hospitalBasicState } from '../../atoms';
import KakaoMap from '../../components/kakao/KakaoMap';
import HositalTotal from '../../components/hospital/HositalTotal';

const SContainer = styled.div``;

function HospitalDetail() {
  const information = useLocation();
  const { hospitalId } = useParams();
  const { xPosition, yPosition } = information.state.information;
  const [hospitalDesc, setHospitalDesc] = useRecoilState(hospitalDescState);
  const [hospitalBasic, setHospitalBasic] = useRecoilState(hospitalBasicState);

  useEffect(() => {
    axios
      .get(`${API_URL_HOSPITAL}/desc/${hospitalId}`)
      .then(
        res => setHospitalDesc(res.data.data),
        setHospitalBasic(information.state.information),
      )
      .catch(err => console.log(err));
  }, []);
  return (
    <SContainer>
      <KakaoMap x={xPosition} y={yPosition} />
      <HositalTotal />
    </SContainer>
  );
}

export default HospitalDetail;

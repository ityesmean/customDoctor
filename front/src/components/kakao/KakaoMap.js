/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* global kakao */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

import BackButton from '../common/BackButton';

import { hospitalSearchResultState } from '../../atoms';

const { kakao } = window;

function KakaoMap({ x, y }) {
  const navigate = useNavigate();
  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );

  console.log(hospitalSearchResult);
  useEffect(() => {
    var mapContainer = document.getElementById('map'); // 지도를 표시할 div
    var mapOption = {
      center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    console.log(mapContainer);
    console.log(mapOption);

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치 입니다.
    var markerPosition = new kakao.maps.LatLng(x, y);

    // 마커를 생성합니다.
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, []);

  const tempOnClick = () => {
    navigate(-1);
  };
  return (
    <>
      {/* <Link to="/hospital/search/result"> */}
      <div onClick={tempOnClick}>
        <BackButton />
      </div>
      {/* </Link> */}
      <div id="map" style={{ width: '100vw', height: '20vh' }}></div>
      <div></div>
    </>
  );
}

KakaoMap.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

KakaoMap.defaultProps = {
  x: null,
  y: null,
};

export default KakaoMap;

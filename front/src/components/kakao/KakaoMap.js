/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable block-scoped-var */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* global kakao */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { hospitalSearchResultState, myPositionState } from '../../atoms';

const SReSearchButton = styled.button`
  position: absolute;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 999;
  border: none;
  background: white;
  font-weight: bold;
`;

const { kakao } = window;

function KakaoMap({ lat, lng }) {
  const myPosition = useRecoilValue(myPositionState);

  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );

  useEffect(() => {
    var mapContainer = document.getElementById('map'); // 지도를 표시할 div
    var mapOption = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // console.log(mapContainer);
    // console.log(mapOption);

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 이미지 주소
    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    // console.log(hospitalSearchResult.lenght);
    // 마커들을 생성합니다.
    for (var i = 0; i < hospitalSearchResult.length; i++) {
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다.
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다.
      var marker = new kakao.maps.Marker({
        map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(
          hospitalSearchResult[i].hospitalY,
          hospitalSearchResult[i].hospitalX,
        ), // 마커를 표시할 위치
        // title: hospitalSearchResult[i].hospitalName, // 마커의 타이틀
        image: markerImage, // 마커 이미지
      });
      marker.setMap(map);
    }
  }, [lat, lng]);

  // 1안 코드 -----------------------------------------------------------------

  return (
    <>
      <SReSearchButton>현 위치에서 검색</SReSearchButton>
      <div id="map" style={{ width: '100vw', height: '95vh' }}></div>
    </>
  );
}

KakaoMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

KakaoMap.defaultProps = {
  lat: null,
  lng: null,
};

export default KakaoMap;

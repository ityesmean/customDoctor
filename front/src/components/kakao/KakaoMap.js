/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable block-scoped-var */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* global kakao */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { hospitalSearchResultState, myPositionState } from '../../atoms';

import './Overlay.css';

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

  console.log(hospitalSearchResult);

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  function closeOverlay() {
    overlay.setMap(null);
  }

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

      // var infowindow = new kakao.maps.InfoWindow({
      //   // content:
      //   //   '<div>' +
      //   //   hospitalSearchResult[i].hospitalName +
      //   //   '</div>' +
      //   //   '<div>' +
      //   //   hospitalSearchResult[i].hospitalTel +
      //   //   '</div>',
      // });

      // 커스텀 오버레이를 표시할 좌표
      var position = new kakao.maps.LatLng(
        hospitalSearchResult[i].hospitalY,
        hospitalSearchResult[i].hospitalX,
      );

      // 커스텀 오버레이에 들어갈 content
      // var content =
      //   '<div>' +
      //   '  <div>' +
      //   hospitalSearchResult[i].hospitalName +
      //   '  </div>' +
      //   '  <div onClick="closeOverlay()" title="닫아보자">' +
      //   '    닫기' +
      //   '  </div>' +
      //   '</div>';

      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        hospitalSearchResult[i].hospitalName +
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
        '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
        hospitalSearchResult[i].hospitalTel +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

      var overlay = new kakao.maps.CustomOverlay({
        content,
        map,
        position,
      });

      marker.setMap(map);

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
      });
    }
  }, []);

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

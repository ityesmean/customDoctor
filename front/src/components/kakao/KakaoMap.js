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
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import BackButton from '../common/BackButton';

import { hospitalSearchResultState } from '../../atoms';

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
  const navigate = useNavigate();
  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );

  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          '</div>',
      );
      infowindow.open(map, marker);
    });
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
      }
    }
  }

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    var mapContainer = document.getElementById('map'); // 지도를 표시할 div
    var mapOption = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // console.log(mapContainer);
    // console.log(mapOption);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);

    // 카테고리로 은행을 검색합니다
    ps.categorySearch('HP8', placesSearchCB, { useMapBounds: true });

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // function placesSearchCB(data, status, pagination) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     for (var i = 0; i < data.length; i++) {
    //       displayMarker(data[i]);
    //     }
    //   }
    // }

    // 지도에 마커를 표시하는 함수입니다
    // function displayMarker(place) {
    //   // 마커를 생성하고 지도에 표시합니다
    //   var marker = new kakao.maps.Marker({
    //     map,
    //     position: new kakao.maps.LatLng(place.y, place.x),
    //   });

    //   // 마커에 클릭이벤트를 등록합니다
    //   kakao.maps.event.addListener(marker, 'click', function () {
    //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    //     infowindow.setContent(
    //       '<div style="padding:5px;font-size:12px;">' +
    //         place.place_name +
    //         '</div>',
    //     );
    //     infowindow.open(map, marker);
    //   });
    // }
  });

  // console.log(x, y)

  // console.log(hospitalSearchResult)

  // console.log(hospitalSearchResult);

  // 1안 코드 -----------------------------------------------------------------
  // useEffect(() => {
  //   var mapContainer = document.getElementById('map'); // 지도를 표시할 div
  //   var mapOption = {
  //     center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
  //     level: 3, // 지도의 확대 레벨
  //   };

  //   // console.log(mapContainer);
  //   // console.log(mapOption);

  //   // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  //   var map = new kakao.maps.Map(mapContainer, mapOption);

  //   // 마커 이미지 주소
  //   var imageSrc =
  //     'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

  //   // console.log(hospitalSearchResult.lenght);
  //   // 마커들을 생성합니다.
  //   for (var i = 0; i < hospitalSearchResult.length; i++) {
  //     var imageSize = new kakao.maps.Size(24, 35);

  //     // 마커 이미지를 생성합니다.
  //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  //     // 마커를 생성합니다.
  //     var marker = new kakao.maps.Marker({
  //       map, // 마커를 표시할 지도
  //       position: new kakao.maps.LatLng(
  //         hospitalSearchResult[i].hospitalY,
  //         hospitalSearchResult[i].hospitalX,
  //       ), // 마커를 표시할 위치
  //       // title: hospitalSearchResult[i].hospitalName, // 마커의 타이틀
  //       image: markerImage, // 마커 이미지
  //     });
  //     marker.setMap(map);
  //   }
  // }, [lat, lng]);

  // const tempOnClick = () => {
  //   navigate(-1);
  // };
  // 1안 코드 -----------------------------------------------------------------

  return (
    <>
      {/* <Link to="/hospital/search/result"> */}
      {/* <div onClick={tempOnClick}> */}
      <BackButton />
      {/* </div> */}
      <SReSearchButton>현 위치에서 검색</SReSearchButton>
      {/* </Link> */}
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

// /* eslint-disable no-var */
// /* eslint-disable no-undef */
// /* eslint-disable no-shadow */
// /* eslint-disable func-names */
// /* eslint-disable no-plusplus */
// /* eslint-disable vars-on-top */
// /* eslint-disable no-loop-func */
// /* eslint-disable no-unused-vars */
// /* eslint-disable prefer-template */
// /* eslint-disable block-scoped-var */
// /* eslint-disable object-shorthand */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-use-before-define */
// /* eslint-disable no-inner-declarations */
// /* eslint-disable prefer-arrow-callback */
// /* eslint-disable react/self-closing-comp */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* global kakao */
// import React, { useState, useEffect } from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import styled from 'styled-components';

// import {
//   hospitalSearchResultState,
//   myPositionState,
//   searchOptionState,
// } from '../../atoms';

// import './Overlay.css';

// import GreenHospital from '../../assets/mypage/GreenHospital.png';

// // const SButtonWrapper = styled.div`
// //   align-items: center;
// // `;

// const SReSearchButton = styled.button`
//   position: absolute;
//   width: 30vw;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 10px;
//   z-index: 999;
//   border: none;
//   background: white;
//   padding: 0.5vw 2vw 0.5vw 2vw;
//   font-weight: bold;
//   text-align: center;
//   left: 0;
//   right: 0;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 2vh;
// `;

// const { kakao } = window;

// function KakaoMap({ lat, lng }) {
//   const myPosition = useRecoilValue(myPositionState);

//   const currentTime = new Date();
//   const currentDay = currentTime.getDay();
//   const currentHours = currentTime.getHours();
//   const currentMinutes = currentTime.getMinutes();

//   const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
//     hospitalSearchResultState,
//   );
//   const [searchOption, setSearchOption] = useRecoilState(searchOptionState);
//   const [mapCenter, setMapCenter] = useState()

//   // var mapContainer = document.getElementById('map'); // 지도를 표시할 div
//   // var mapOption = {
//   // center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
//   // // draggable: true,
//   // level: 3, // 지도의 확대 레벨
//   // };

//   // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
//   // var map = new kakao.maps.Map(mapContainer, mapOption);
//   // console.log('234')
//   // setKakaoMap(map)

//   // var center = map.getCenter()
//   // console.log(center)

//   // 병원을 재 검색할때 실행되는 함수
//   const onClickReSearchHospitalListHandler = async () => {
//     console.log(searchOption[0]);
//     if (searchOption[0] === 'keyWord') {
//       await axios
//         .get(
//           `${process.env.REACT_APP_URL}/hospital/search/${searchOption[1]}`,
//           {
//             e: myPosition[2],
//             w: myPosition[3],
//             s: myPosition[4],
//             n: myPosition[5],
//             hour: currentHours,
//             min: currentMinutes,
//             day: currentDay,
//           },
//         )
//         .then(res => {
//           if (res.data.status_code === 204) {
//             setHospitalList([]);
//           } else {
//             setHospitalSearchResult(res.data.data);
//           }
//         })
//         .catch(err => console.log(err));
//     } else if (searchOption[0] === 'option') {
//       console.log('옵션으로 검색');
//       await axios
//         .post(`${process.env.REACT_APP_API_URL}/hospital/find`, {
//           e: myPosition[2],
//           w: myPosition[3],
//           s: myPosition[4],
//           n: myPosition[5],
//           part: searchOption[1][0],
//           open: searchOption[1][1],
//           hour: currentHours,
//           min: currentMinutes,
//           day: currentDay,
//         })
//         .then(res => {
//           if (res.data.status_code === 200) {
//             setHospitalSearchResult(res.data.data);
//           } else if (res.data.status_code === 400) {
//             setHospitalList(false);
//           }
//         })
//         .catch(err => console.log(err));
//     }
//   };

//   // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
//   // function closeOverlay() {
//   //   overlay.setMap(null);
//   // }

//   useEffect(() => {
//     var mapContainer = document.getElementById('map'); // 지도를 표시할 div
//     var mapOption = {
//       center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
//       // draggable: true,
//       level: 3, // 지도의 확대 레벨
//     };

//     // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
//     var map = new kakao.maps.Map(mapContainer, mapOption);

//     var center = map.getCenter()
//     setMapCenter(center)

//     // 마커 이미지 주소
//     var imageSrc =
//       'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

//     var imageSize = new kakao.maps.Size(24, 35);

//     // 마커 이미지를 생성합니다.
//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
//     // 마커들을 생성합니다.

//     // 마커와 커스텀 오버레이 순회
//     for (let i = 0; i < hospitalSearchResult.length; i++) {
//       var data = hospitalSearchResult;
//       displayMarker(data[i]);
//     }

//     function displayMarker(data) {
//       // 마커를 생성합니다.

//       var marker = new kakao.maps.Marker({
//         map, // 마커를 표시할 지도
//         position: new kakao.maps.LatLng(data.hospitalY, data.hospitalX), // 마커를 표시할 위치

//         image: markerImage, // 마커 이미지
//       });

//       // 커스텀 오버레이를 표시할 좌표
//       var position = new kakao.maps.LatLng(data.hospitalY, data.hospitalX);

//       var overlay = new kakao.maps.CustomOverlay({
//         // 맵 주석 해제하면 처음에 overlay 닫혀있음
//         // map,
//         position,

//         // 오버레이 클릭하면 지도 이벤트 막기
//         clickable: true,
//       });

//       // 오버레이 html 생성
//       var content = document.createElement('div');
//       content.className = 'wrap';

//       var info = document.createElement('div');
//       info.className = 'info';

//       var title = document.createElement('div');
//       title.className = 'title';
//       // 병원 이름의 길이가 10자 이상이면 10번째 까지 slicing
//       if (data.hospitalName.length >= 10) {
//         var filteredHospitalName = data.hospitalName.substr(0, 10) + '...';
//       } else {
//         filteredHospitalName = data.hospitalName;
//       }
//       title.innerHTML = filteredHospitalName;
//       data.hospitalName.substr(0, 10);

//       var close = document.createElement('div');
//       close.className = 'close';
//       close.setAttribute('title', '닫기');

//       var body = document.createElement('div');
//       body.className = 'body';

//       var imgDiv = document.createElement('div');
//       imgDiv.className = 'img';

//       var desc = document.createElement('div');
//       desc.className = 'desc';

//       var img = document.createElement('img');
//       img.className = 'hospitalImage';
//       img.setAttribute('src', GreenHospital);

//       var address = document.createElement('div');
//       address.className = 'ellipsis';
//       address.innerHTML = '임시 주소';

//       var tel = document.createElement('tel');
//       tel.innerHTML = data.hospitalTel;

//       content.append(info);
//       info.append(title, body);
//       title.append(close);
//       body.append(imgDiv, desc);
//       imgDiv.append(img);
//       desc.append(address, tel);

//       overlay.setContent(content);

//       close.onclick = function () {
//         console.log('악');
//         overlay.setMap(null);
//       };
//       kakao.maps.event.addListener(marker, 'click', function () {
//         overlay.setMap(map);
//       });

//       // marker.setMap(map);
//     }
//   }, []);

//   // 1안 코드 -----------------------------------------------------------------

//   return (
//     <>
//       {/* <SButtonWrapper> */}
//       <SReSearchButton onClick={onClickReSearchHospitalListHandler}>
//         현 위치에서 검색
//       </SReSearchButton>
//       {/* </SButtonWrapper> */}
//       <div id="map" style={{ width: '100vw', height: '95vh' }}></div>
//     </>
//   );
// }

// KakaoMap.propTypes = {
//   lat: PropTypes.number,
//   lng: PropTypes.number,
// };

// KakaoMap.defaultProps = {
//   lat: null,
//   lng: null,
// };

// export default KakaoMap;


// -------------------------------------- SDK

/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import axios from "axios";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { hospitalSearchResultState, myPositionState, searchOptionState } from "../../atoms";

import GreenHospital from '../../assets/mypage/GreenHospital.png';

import './Overlay.css'

const SReSearchButton = styled.button`
  position: absolute;
  width: 30vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 999;
  border: none;
  background: white;
  padding: 0.5vw 2vw 0.5vw 2vw;
  font-weight: bold;
  text-align: center;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
`

function KakaoMap({ lat, lng }) {

  const hospitalMap = useRef();

  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(hospitalSearchResultState)
  const [selectedMarker, setSelectedMarker] = useState()
  const [mapCenter, setMapCenter] = useState()

  const myPosition = useRecoilValue(myPositionState);

  const [searchOption, setSearchOption] = useRecoilState(searchOptionState);

  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // 거리 계산
  const latPerKm = 0.0091;
  const lngPerKm = 0.0113;

  // const newMyPosition = [mapCenter.lat, mapCenter.lng, mapCenter.lng + lngPerKm * 5, mapCenter.lng + lngPerKm - 5, mapCenter.lat - latPerKm * 5, mapCenter.lat - latPerKm - 5]
  // console.log(myPosition)


  // 병원을 재 검색할때 실행되는 함수
  const onClickReSearchHospitalListHandler = async () => {
    console.log(mapCenter.lat, mapCenter.lng, mapCenter.lng + lngPerKm * 5, mapCenter.lng + lngPerKm - 5, mapCenter.lat - latPerKm * 5, mapCenter.lat - latPerKm - 5);
    console.log(mapCenter)
    if (searchOption[0] === 'keyWord') {
      await axios
        .get(
          `${process.env.REACT_APP_URL}/hospital/search/${searchOption[1]}`,
          {
            e: mapCenter.lng + lngPerKm * 3,
            w: mapCenter.lng - lngPerKm * 3,
            s: mapCenter.lat - latPerKm * 3,
            n: mapCenter.lat + latPerKm * 3,
            hour: currentHours,
            min: currentMinutes,
            day: currentDay,
          },
        )
        .then(res => {
          if (res.data.status_code === 204) {
            setHospitalSearchResult([]);
          } else {
            setHospitalSearchResult(res.data.data);
          }
        })
        .catch(err => console.log(err));
    } else if (searchOption[0] === 'option') {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/hospital/find`, {
          e: mapCenter.lng + lngPerKm * 3,
          w: mapCenter.lng - lngPerKm * 3,
          s: mapCenter.lat - latPerKm * 3,
          n: mapCenter.lat + latPerKm * 3,
          part: searchOption[1][0],
          open: searchOption[1][1],
          hour: currentHours,
          min: currentMinutes,
          day: currentDay,
        })
        .then(res => {
          if (res.data.status_code === 200) {
            setHospitalSearchResult(res.data.data);
          } else if (res.data.status_code === 400) {
            setHospitalSearchResult([]);
          }
        })
        .catch(err => console.log(err));
    }
  };

  // useEffect(() => {
  //   // location.reload();
  // }, [hospitalSearchResult])

  return (
    <>
      <SReSearchButton onClick={onClickReSearchHospitalListHandler}>
        현 위치에서 검색
      </SReSearchButton>
      <Map
        center={{ lat, lng }}
        style={{ width: '100vw', height: '30vh' }}
        onBoundsChanged={(map) => setMapCenter({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng()
        })}
        ref={hospitalMap}
      >
        {hospitalSearchResult.map((hospital, index) => (
          <>
            <MapMarker
              key={`${hospital.hospitalName}-${hospital.hospitalX}`}
              position={{ lat: hospital.hospitalY, lng: hospital.hospitalX }}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: {
                  width: 24,
                  height: 35,
                }
              }}
              // onClick={() => setSeleteMarker(index)}
              onClick={() => setSelectedMarker(index)}
              isClicked={selectedMarker === index}
            />
            {selectedMarker === index ? (
              <CustomOverlayMap position={{ lat: hospital.hospitalY, lng: hospital.hospitalX }}>
                <div className="wrap">
                  <div className="info">
                    <div className="title">
                      {hospital.hospitalName.length >= 10 ? hospital.hospitalName.substr(0, 10) + '...' : hospital.hospitalName}
                      <div
                        className="close"
                        onClick={() => setSelectedMarker(false)}
                        title="닫기"
                      ></div>
                    </div>
                    <div className="body">
                      <div className="img">
                        <img
                          src={GreenHospital}
                          width="73"
                          height="70"
                          alt="카카오 스페이스닷원"
                        />
                      </div>
                      <div className="desc">
                        <div className="ellipsis">
                          주소들어갈곳
                        </div>
                        <div className="tel">
                          {hospital.hospitalTel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ;
              </CustomOverlayMap>
            ) : null}
          </>
        ))}
      </Map >
    </>
  )
}

export default KakaoMap;

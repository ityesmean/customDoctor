/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  hospitalSearchResultState,
  myPositionState,
  searchOptionState,
  hospitalBasicState,
} from '../../atoms';

import GreenHospital from '../../assets/mypage/GreenHospital.png';
import HospitalOff from '../../assets/HospitalOff.png';
import './Overlay.css';

const SReSearchButton = styled.button`
  position: absolute;
  width: 150px;
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
`;

function KakaoMap({ lat, lng }) {
  const hospitalMap = useRef();

  const [basicInfo, setBasicInfo] = useRecoilState(hospitalBasicState);

  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );
  const [selectedMarker, setSelectedMarker] = useState();
  const [mapCenter, setMapCenter] = useState();

  const myPosition = useRecoilValue(myPositionState);

  const [searchOption, setSearchOption] = useRecoilState(searchOptionState);

  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // 거리 계산
  const latPerKm = 0.0091;
  const lngPerKm = 0.0113;

  // 병원을 재 검색할때 실행되는 함수
  const onClickReSearchHospitalListHandler = async () => {
    console.log(searchOption);
    console.log(mapCenter);
    console.log(
      mapCenter.lat,
      mapCenter.lng,
      mapCenter.lng + lngPerKm * 1,
      mapCenter.lng + lngPerKm - 1,
      mapCenter.lat - latPerKm * 1,
      mapCenter.lat - latPerKm - 1,
    );
    console.log(mapCenter);
    if (searchOption[0] === 'keyWord') {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/hospital/search/${searchOption[1]}`,
          {
            e: mapCenter.lng + lngPerKm * 1,
            w: mapCenter.lng - lngPerKm * 1,
            s: mapCenter.lat - latPerKm * 1,
            n: mapCenter.lat + latPerKm * 1,
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
        });
    } else if (searchOption[0] === 'option') {
      console.log(searchOption);
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

  useEffect(() => {
    onClickReSearchHospitalListHandler();
    setMapCenter(lat, lng);
  }, []);

  return (
    <>
      <SReSearchButton onClick={onClickReSearchHospitalListHandler}>
        현 위치에서 검색
      </SReSearchButton>
      <Map
        center={{ lat, lng }}
        style={{ width: '100vw', height: '30vh' }}
        onBoundsChanged={map =>
          setMapCenter({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        }
        ref={hospitalMap}
      >
        {hospitalSearchResult &&
          hospitalSearchResult.map((hospital, index) => (
            <>
              <MapMarker
                key={`${hospital.hospitalName}-${hospital.hospitalX}`}
                position={{ lat: hospital.hospitalY, lng: hospital.hospitalX }}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  size: {
                    width: 24,
                    height: 35,
                  },
                }}
                // onClick={() => setSeleteMarker(index)}
                onClick={() => {
                  setSelectedMarker(index);
                  setBasicInfo(hospital);
                }}
                isClicked={selectedMarker === index}
              />
              {selectedMarker === index ? (
                <CustomOverlayMap
                  position={{
                    lat: hospital.hospitalY,
                    lng: hospital.hospitalX,
                  }}
                >
                  <div className="wrap">
                    <div className="info">
                      <div className="title">
                        {hospital.hospitalName.length >= 10
                          ? hospital.hospitalName.substr(0, 10) + '...'
                          : hospital.hospitalName}
                        <div
                          className="close"
                          onClick={() => setSelectedMarker(false)}
                          title="닫기"
                        ></div>
                      </div>
                      <div className="body">
                        <div className="img">
                          <img
                            // src={GreenHospital}
                            src={
                              hospital.hospitalOpen
                                ? GreenHospital
                                : HospitalOff
                            }
                            // width="73"
                            // height="70"
                            alt="카카오 스페이스닷원"
                          />
                        </div>
                        <div className="desc">
                          {hospital.hospitalOpen ? (
                            <div className="ellipsis">진료중</div>
                          ) : (
                            <div>진료 종료</div>
                          )}
                          {/* <div className="ellipsis">주소들어갈곳</div> */}
                          <div className="tel">{hospital.hospitalTel}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomOverlayMap>
              ) : null}
            </>
          ))}
      </Map>
    </>
  );
}

export default KakaoMap;

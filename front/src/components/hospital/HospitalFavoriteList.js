/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import { hospitalFavoriteState } from '../../atoms';
import HospitalCard from './HospitalCard';
import { myPositionState } from '../../atoms';

const SContainer = styled.div``;

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function hospitalFavoriteList() {
  // const favoriteList = useRecoilValue(hospitalFavoriteState);
  // console.log(favoriteList, 'favoriteList');
  const [favoriteList, setFavoriteList] = useState([]);
  const [myPosition, setMyPosition] = useState(myPositionState);
  const [myLat, setMyLat] = useState(36.35774018625376);
  const [myLng, setMyLng] = useState(127.30313129648327);

  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const token = localStorage.getItem('accessToken');

  function getMyPosition() {
    const latPerKm = 0.0091;
    const lngPerKm = 0.0113;

    // 본인의 위도, 경도 위치 가져오기 성공할때 실행되는 함수
    const successLocation = position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setMyLat(lat);
      setMyLng(lng);

      const myTempEast = lng + latPerKm * 5;
      const myTempWest = lng - latPerKm * 5;
      const myTempSouth = lat - lngPerKm * 5;
      const myTempNorth = lat + lngPerKm * 5;

      const myPositions = [];
      myPositions.push(
        lat,
        lng,
        myTempEast,
        myTempWest,
        myTempSouth,
        myTempNorth,
      );
      // console.log(myPositions);
      setMyPosition(myPositions);
    };

    // 본인의 위도, 경도 위치 가져오기 실패할때 실행되는 함수
    const failLocation = () => {
      alert('위치 불러오기 실패');
    };

    // 본인의 위도, 경도 위치 가져오기
    navigator.geolocation.getCurrentPosition(successLocation, failLocation);
  }
  // 거리계산
  function getDistance(lat1, lng1, lat2, lng2) {
    console.log('좌표', lat1, lng1, lat2, lng2);
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d * 10) / 10;
  }

  const makeHospitalList = searchList => {
    const newList = searchList.map((h, index) => ({
      hospitalCode: h.hospitalCode,
      hospitalId: h.hospitalId,
      hospitalName: h.hospitalName,
      hospitalOpen: h.hospitalOpen,
      hospitalPart: h.hospitalPart,
      hospitalTel: h.hospitalTel,
      hospitalTime: h.hospitalTime,
      hospitalX: h.hospitalX,
      hospitalY: h.hospitalY,
      hospitalDistance: getDistance(myLat, myLng, h.hospitalY, h.hospitalX),
    }));
    newList.sort((a, b) => a.hospitalDistance - b.hospitalDistance);
    setFavoriteList(newList);
  };

  const getFavoriteList = useCallback(async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/hospital/marklist`,
        // { withCredentials: true },
        { hour: currentHours, min: currentMinutes, day: currentDay },
        { headers: { Authorization: `${token}` } },
      )
      .then(res => {
        if (res.data.status_code === 204) {
          console.log(res.data.data, '204');
          setFavoriteList(false);
        } else {
          makeHospitalList(res.data.data);
          console.log(res.data, '200');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(favoriteList, 'favoriteList');

  useEffect(() => {
    if (token) {
      getMyPosition();
      getFavoriteList();
      // makeList();
    }
  }, []);
  return (
    <SContainer>
      {favoriteList &&
        favoriteList.map((faovrite, index) => (
          <SLink
            to={`/hospital/${faovrite.hospitalId}`}
            key={faovrite.hospitalName}
            state={{ information: faovrite }}
          >
            <HospitalCard hospital={faovrite} index={index} />
          </SLink>
        ))}
    </SContainer>
  );
}

export default hospitalFavoriteList;

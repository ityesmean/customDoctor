/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import HospitalCard from './HospitalCard';

import { hospitalSearchResultState, hospitalFavoriteState } from '../../atoms';

import { API_URL_HOSPITAL, API_URL_USER } from '../../api/api';

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

// props 로는 선택된 필터 버튼의 값이 전달된다. ex) distance, star, open
function HospitalList({
  selectedValue,
  isOnValue,
  searchType,
  searchValue,
  myPosition,
}) {
  // 병원리스트 state
  // const [hospitalList, setHospitalList] = useState([]);
  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );
  const [hospitalList, setHospitalList] = useState();
  const [hospitalListDistance, setHospitalListDistance] = useState();

  const type = searchType;
  const value = searchValue;
  const position = myPosition;
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // 거리계산
  function getDistance(lat1, lng1, lat2, lng2) {
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

  // 정확도순 리스트 만들기
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
      hospitalDistance: getDistance(
        position[0],
        position[1],
        h.hospitalY,
        h.hospitalX,
      ),
    }));
    setHospitalList(newList);
  };

  // 거리순 리스트 만들기
  const makeHospitalDistanceList = searchList => {
    const newDistanceList = searchList.map((h, index) => ({
      hospitalCode: h.hospitalCode,
      hospitalId: h.hospitalId,
      hospitalName: h.hospitalName,
      hospitalOpen: h.hospitalOpen,
      hospitalPart: h.hospitalPart,
      hospitalTel: h.hospitalTel,
      hospitalTime: h.hospitalTime,
      hospitalX: h.hospitalX,
      hospitalY: h.hospitalY,
      hospitalDistance: getDistance(
        position[0],
        position[1],
        h.hospitalY,
        h.hospitalX,
      ),
    }));
    newDistanceList.sort((a, b) => a.hospitalDistance - b.hospitalDistance);
    setHospitalListDistance(newDistanceList);
  };

  const getKeywordHospitalSearchResult = async () => {
    console.log(value);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/hospital/search/${value}`, {
        e: position[2],
        w: position[3],
        s: position[4],
        n: position[5],
        hour: currentHours,
        min: currentMinutes,
        day: currentDay,
      })
      .then(res => {
        if (res.data.status_code === 204) {
          setHospitalList([]);
        } else {
          makeHospitalList(res.data.data);
          makeHospitalDistanceList(res.data.data);
          setHospitalSearchResult(res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  const getOptionHospitalSearchResult = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/hospital/find`, {
        e: position[2],
        w: position[3],
        s: position[4],
        n: position[5],
        part: value[0],
        open: value[1],
        hour: currentHours,
        min: currentMinutes,
        day: currentDay,
      })
      .then(res => {
        if (res.data.status_code === 200) {
          makeHospitalList(res.data.data);
          makeHospitalDistanceList(res.data.data);
          setHospitalSearchResult(res.data.data);
        } else if (res.data.status_code === 400) {
          setHospitalList(false);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (type === 'keyWord') {
      getKeywordHospitalSearchResult();
    } else if (type === 'option') {
      getOptionHospitalSearchResult();
    }
  }, []);

  useEffect(() => {}, [hospitalList]);
  return (
    <>
      {/* 정확도, 진료중 미선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'standard' && hospitalList && !isOnValue && (
        <>
          {hospitalList
            .filter(hospital => hospital.hospitalDistance <= 3)
            .map((hospital, index) => (
              <SLink
                to={`/hospital/${hospital.hospitalId}`}
                key={hospital.hospitalName}
                state={{ information: hospital }}
              >
                <HospitalCard hospital={hospital} index={index} />
              </SLink>
            ))}
        </>
      )}
      {/* 정확도, 진료중 선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'standard' && hospitalList && isOnValue && (
        <>
          {hospitalList
            .filter(
              hospital =>
                hospital.hospitalDistance <= 3 && hospital.hospitalOpen,
            )
            .map((hospital, index) => (
              <SLink
                to={`/hospital/${hospital.hospitalId}`}
                key={hospital.hospitalName}
                state={{ information: hospital }}
              >
                <HospitalCard hospital={hospital} index={index} />
              </SLink>
            ))}
        </>
      )}

      {/* 거리, 진료중 미선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance' && hospitalListDistance && !isOnValue && (
        <>
          {hospitalListDistance
            .filter(hospital => hospital.hospitalDistance <= 3)
            .map((hospital, index) => (
              <SLink
                to={`/hospital/${hospital.hospitalId}`}
                key={hospital.hospitalName}
                state={{ information: hospital }}
              >
                <HospitalCard hospital={hospital} index={index} />
              </SLink>
            ))}
        </>
      )}

      {/* 거리, 진료중 선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance' && hospitalListDistance && isOnValue && (
        <>
          {hospitalListDistance
            .filter(
              hospital =>
                hospital.hospitalDistance <= 3 && hospital.hospitalOpen,
            )
            .map((hospital, index) => (
              <SLink
                to={`/hospital/${hospital.hospitalId}`}
                key={hospital.hospitalName}
                state={{ information: hospital }}
              >
                <HospitalCard hospital={hospital} index={index} />
              </SLink>
            ))}
        </>
      )}
    </>
  );
}

HospitalList.propTypes = {
  searchType: PropTypes.string,
  searchValue: PropTypes.string,
  myPosition: PropTypes.string,
};

HospitalList.defaultProps = {
  searchType: null,
  searchValue: null,
  myPosition: null,
};

export default HospitalList;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
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

const move = keyframes`
  from {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(0deg);
  }
  0% {
    left: 0;
    opacity:0;
  }
  35% {
    left: 33%; 
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    left: 59%; 
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left: 100%; 
    transform:rotate(-180deg);
    opacity:0;
  }
  
`;

const SLoadingSpin = styled.div`
  position: absolute;
  top: 50%;
  margin-left: -50px;
  width: 600px;
  height: 100px;
  overflow: hidden;
  user-select: none;
  cursor: default;
`;

const SLodingWord = styled.div`
  position: absolute;
  display: inline-block;
  margin-top: 50px;
  width: 100px;
  height: 36px;
  opacity: 0;
  font-size: 48px;
  font-weight: bold;

  animation: ${move} 2s linear infinite;
  color: #009e8b;

  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  #&:nth-child(3) {
    animation-delay: 0.6s;
  }
  &:nth-child(4) {
    animation-delay: 0.8s;
  }
  &:nth-child(5) {
    animation-delay: 1s;
  }
  &:nth-child(6) {
    animation-delay: 1.2s;
  }
`;

const SEmptyBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #099e8b;
`;

const Sbox = styled.div`
  position: absolute;
  top: 20%;
`;
const endTyping = keyframes`
  0.0000% { content: ""; }
  1.1395% { content: "병"; }
  2.2791% { content: "병원"; }
  3.4186% { content: "병원이"; }
  4.5581% { content: "병원이 "; }
  5.6977% { content: "병원이 없"; }
  6.8372% { content: "병원이 없습"; }
  7.9767% { content: "병원이 없습니"; }
  9.1163% { content: "병원이 없습니다"; }
  10.2558%{ content: "병원이 없습니다."; }
`;

const SEnd = styled.div`
  font-size: 9vmin;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
  --caret: currentcolor;

  &:before {
    content: '병원이 없습니다.';
    animation: ${endTyping} 13.5s forwards;
  }
`;

const middleTyping = keyframes`
  0.0000% { content: ""; }
  1.1395% { content: "진"; }
  2.2791% { content: "진료"; }
  3.4186% { content: "진료중"; }
  4.5581% { content: "진료중인"; }
`;

const SMiddle = styled.div`
  font-size: 9vmin;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
  --caret: currentcolor;

  &:before {
    content: '진료중인';
    animation: ${middleTyping} 13.5s forwards;
  }
`;

const emptyStandardTyping = keyframes`
  0.0000% { content: ""; }
  1.1395% { content: "전"; }
  2.2791% { content: "전체"; }
  3.4186% { content: "전체 "; }
  4.5581% { content: "전체 검"; }
  5.6977% { content: "전체 검색"; }
  6.8372% { content: "전체 검색에"; }
`;

const SEmptyStandard = styled.div`
  font-size: 9vmin;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
  --caret: currentcolor;

  &:before {
    content: '전체 검색에';
    animation: ${emptyStandardTyping} 13.5s forwards;
  }
`;

const emptyDistance1Typing = keyframes`
  0.0000% { content: ""; }
  1.1395% { content: "1"; }
  2.2791% { content: "1k"; }
  3.4186% { content: "1km"; }
  4.5581% { content: "1km "; }
  5.6977% { content: "1km 이"; }
  6.8372% { content: "1km 이내"; }
  7.9767% { content: "1km 이내에"; }
`;

const SEmptyDistance1 = styled.div`
  font-size: 9vmin;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
  --caret: currentcolor;

  &:before {
    content: '1km 이내에';
    animation: ${emptyDistance1Typing} 13.5s forwards;
  }
`;

const emptyDistance2Typing = keyframes`
  0.0000% { content: ""; }
  1.1395% { content: "2"; }
  2.2791% { content: "2k"; }
  3.4186% { content: "2km"; }
  4.5581% { content: "2km "; }
  5.6977% { content: "2km 이"; }
  6.8372% { content: "2km 이내"; }
  7.9767% { content: "2km 이내에"; }
`;

const SEmptyDistance2 = styled.div`
  font-size: 9vmin;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
  --caret: currentcolor;

  &:before {
    content: '2km 이내에';
    animation: ${emptyDistance2Typing} 13.5s forwards;
  }
`;

const emptyDistance3Typing = keyframes`
  0.0000% { content: ""; }
  1.1395% { content: "3"; }
  2.2791% { content: "3k"; }
  3.4186% { content: "3km"; }
  4.5581% { content: "3km "; }
  5.6977% { content: "3km 이"; }
  6.8372% { content: "3km 이내"; }
  7.9767% { content: "3km 이내에"; }
`;

const SEmptyDistance3 = styled.div`
  font-size: 9vmin;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin: 1rem 0 1rem 2rem;
  --caret: currentcolor;

  &:before {
    content: '3km 이내에';
    animation: ${emptyDistance3Typing} 13.5s forwards;
  }
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
  const [standardHospitalList, setStandardHospitalList] = useState();
  const [standardHospitalListOn, setStandardHospitalListOn] = useState();
  const [distance1HospitalList, setDistance1HospitalList] = useState();
  const [distance1HospitalListOn, setDistance1HospitalListOn] = useState();
  const [distance2HospitalList, setDistance2HospitalList] = useState();
  const [distance2HospitalListOn, setDistance2HospitalListOn] = useState();
  const [distance3HospitalList, setDistance3HospitalList] = useState();
  const [distance3HospitalListOn, setDistance3HospitalListOn] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [favoriteList, setFavoriteList] = useRecoilState(hospitalFavoriteState);

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
        setIsLoading(true);
        if (res.data.status_code === 204) {
          setHospitalList(false);
          setIsLoading(false);
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
        setIsLoading(true);
        if (res.data.status_code === 200) {
          makeHospitalList(res.data.data);
          makeHospitalDistanceList(res.data.data);
          setHospitalSearchResult(res.data.data);
        } else if (res.data.status_code === 400) {
          setHospitalList(false);
          setIsLoading(false);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setHospitalList(false);
    setHospitalListDistance(false);
    setStandardHospitalList(false);
    setStandardHospitalListOn(false);
    setDistance1HospitalList(false);
    setDistance1HospitalListOn(false);
    setDistance2HospitalList(false);
    setDistance2HospitalListOn(false);
    setDistance3HospitalList(false);
    setDistance3HospitalListOn(false);
    setIsLoading(true);

    if (type === 'keyWord') {
      getKeywordHospitalSearchResult();
    } else if (type === 'option') {
      getOptionHospitalSearchResult();
    }
  }, [searchValue]);

  useEffect(() => {
    if (hospitalList) {
      setStandardHospitalList(
        hospitalList.filter(hospital => hospital.hospitalDistance <= 3),
      );
      setStandardHospitalListOn(
        hospitalList.filter(
          hospital => hospital.hospitalDistance <= 3 && hospital.hospitalOpen,
        ),
      );
      setDistance1HospitalList(
        hospitalListDistance.filter(hospital => hospital.hospitalDistance <= 1),
      );
      setDistance1HospitalListOn(
        hospitalListDistance.filter(
          hospital => hospital.hospitalDistance <= 1 && hospital.hospitalOpen,
        ),
      );
      setDistance2HospitalList(
        hospitalListDistance.filter(hospital => hospital.hospitalDistance <= 2),
      );
      setDistance2HospitalListOn(
        hospitalListDistance.filter(
          hospital => hospital.hospitalDistance <= 2 && hospital.hospitalOpen,
        ),
      );
      setDistance3HospitalList(
        hospitalListDistance.filter(hospital => hospital.hospitalDistance <= 3),
      );
      setDistance3HospitalListOn(
        hospitalListDistance.filter(
          hospital => hospital.hospitalDistance <= 3 && hospital.hospitalOpen,
        ),
      );
      setIsLoading(false);
    }
    // console.log(favoriteList, 'favoriteLi  st');
  }, [hospitalList]);

  return (
    <>
      {/* 로딩중 화면 */}
      {isLoading && (
        <SLoadingSpin>
          <SLodingWord>ㅏ</SLodingWord>
          <SLodingWord>ㄷ</SLodingWord>
          <SLodingWord>ㄱ</SLodingWord>
          <SLodingWord>ㅈ</SLodingWord>
          <SLodingWord>ㅏ</SLodingWord>
          <SLodingWord>ㅁ</SLodingWord>
        </SLoadingSpin>
      )}

      {/* 검색 결과 없음 화면 */}
      {!isLoading &&
        selectedValue === 'standard' &&
        (!standardHospitalList || standardHospitalList.length === 0) &&
        !isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyStandard />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}
      {!isLoading &&
        selectedValue === 'standard' &&
        (!standardHospitalListOn || standardHospitalListOn.length === 0) &&
        isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyStandard />
              <SMiddle />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}

      {!isLoading &&
        selectedValue === 'distance1' &&
        (!distance1HospitalList || distance1HospitalList.length === 0) &&
        !isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyDistance1 />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}
      {!isLoading &&
        selectedValue === 'distance1' &&
        (!distance1HospitalListOn || distance1HospitalListOn.length === 0) &&
        isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyDistance1 />
              <SMiddle />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}

      {!isLoading &&
        selectedValue === 'distance2' &&
        (!distance2HospitalList || distance2HospitalList.length === 0) &&
        !isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyDistance2 />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}
      {!isLoading &&
        selectedValue === 'distance2' &&
        (!distance2HospitalListOn || distance2HospitalListOn.length === 0) &&
        isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyDistance2 />
              <SMiddle />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}

      {!isLoading &&
        selectedValue === 'distance3' &&
        (!distance3HospitalList || distance3HospitalList.length === 0) &&
        !isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyDistance3 />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}
      {!isLoading &&
        selectedValue === 'distance3' &&
        (!distance3HospitalListOn || distance3HospitalListOn.length === 0) &&
        isOnValue && (
          <SEmptyBox>
            <Sbox>
              <SEmptyDistance3 />
              <SMiddle />
              <SEnd />
            </Sbox>
          </SEmptyBox>
        )}

      {/* 정확도, 진료중 미선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'standard' && standardHospitalList && !isOnValue && (
        <>
          {standardHospitalList.map((hospital, index) => (
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
      {selectedValue === 'standard' && standardHospitalListOn && isOnValue && (
        <>
          {standardHospitalListOn.map((hospital, index) => (
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

      {/* 거리1km, 진료중 미선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance1' && distance1HospitalList && !isOnValue && (
        <>
          {distance1HospitalList.map((hospital, index) => (
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

      {/* 거리1km, 진료중 선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance1' &&
        distance1HospitalListOn &&
        isOnValue && (
          <>
            {distance1HospitalListOn.map((hospital, index) => (
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

      {/* 거리2km, 진료중 미선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance2' && distance2HospitalList && !isOnValue && (
        <>
          {distance2HospitalList.map((hospital, index) => (
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

      {/* 거리2km, 진료중 선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance2' &&
        distance2HospitalListOn &&
        isOnValue && (
          <>
            {distance2HospitalListOn.map((hospital, index) => (
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

      {/* 거리3km, 진료중 미선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance3' && distance3HospitalList && !isOnValue && (
        <>
          {distance3HospitalList.map((hospital, index) => (
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

      {/* 거리3km, 진료중 선택 - 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {selectedValue === 'distance3' &&
        distance3HospitalListOn &&
        isOnValue && (
          <>
            {distance3HospitalListOn.map((hospital, index) => (
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

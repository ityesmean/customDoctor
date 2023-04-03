/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import HospitalCard from './HospitalCard';

import { hospitalSearchResultState } from '../../atoms';

import { API_URL_HOSPITAL } from '../../api/api';

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

// props 로는 선택된 필터 버튼의 값이 전달된다. ex) distance, star, open
function HospitalList({ searchType, searchValue, myPosition }) {
  // 병원리스트 state
  // const [hospitalList, setHospitalList] = useState([]);
  const [hospitalSearchResult, setHospitalSearchResult] = useRecoilState(
    hospitalSearchResultState,
  );
  const [hospitalList, setHospitalList] = useState();
  const type = searchType;
  const value = searchValue;
  const position = myPosition;
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const getKeywordHospitalSearchResult = async () => {
    await axios
      .post(`${API_URL_HOSPITAL}/search/${value}`, {
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
          setHospitalList(res.data.data);
          setHospitalSearchResult(res.data.data);
        }
      })
      .catch(err => console.log(err));
  };

  const getOptionHospitalSearchResult = async () => {
    await axios
      .post(`${API_URL_HOSPITAL}/find`, {
        e: position[2],
        w: position[3],
        s: position[4],
        n: position[5],
        part: value[0],
        open: value[1],
      })
      .then(res => {
        if (res.data.status_code === 200) {
          setHospitalList(res.data.data);
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
      console.log(`필터 검색`);
      getOptionHospitalSearchResult();
    }
  }, []);

  useEffect(() => {
    console.log(hospitalList);
  }, [hospitalList]);
  return (
    <>
      {/* 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {hospitalList ? (
        <>
          {hospitalList.map((hospital, index) => (
            <SLink
              to={`/hospital/${hospital.hospitalId}`}
              key={hospital.hospitalName}
              state={{ information: hospital }}
            >
              <HospitalCard hospital={hospital} index={index} />
            </SLink>
          ))}
        </>
      ) : (
        <div>로딩스핀</div>
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

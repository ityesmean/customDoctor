/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import HospitalCard from './HospitalCard';

import { API_URL_HOSPITAL } from '../../api/api';

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

// props 로는 선택된 필터 버튼의 값이 전달된다. ex) distance, star, open
function HospitalList({ searchType, searchValue, myPosition }) {
  // 병원리스트 state
  // const [hospitalList, setHospitalList] = useState([]);
  const [hospitalList, setHospitalList] = useState();
  const type = searchType;
  const value = searchValue;
  const position = myPosition;

  const getKeywordHospitalSearchResult = async () => {
    await axios
      .get(`${API_URL_HOSPITAL}/search/${value}`, {
        params: {
          e: position[2],
          w: position[3],
          s: position[4],
          n: position[5],
        },
      })
      .then(res => {
        if (res.data.status_code === 204) {
          setHospitalList(false);
        } else {
          setHospitalList(res.data.data);
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
        if (res.data.status_code === 204) {
          setHospitalList(false);
        } else {
          setHospitalList(res.data.data);
        }
      });
  };

  useEffect(() => {
    if (type === 'keyWord') {
      getKeywordHospitalSearchResult();
    } else if (type === 'option') {
      getOptionHospitalSearchResult();
    }
  }, []);

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
        <div>검색 결과 없음</div>
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

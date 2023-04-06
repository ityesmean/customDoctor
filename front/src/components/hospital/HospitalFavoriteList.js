/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import { hospitalFavoriteState } from '../../atoms';
import HospitalCard from './HospitalCard';

const SContainer = styled.div``;

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function hospitalFavoriteList() {
  // const favoriteList = useRecoilValue(hospitalFavoriteState);
  // console.log(favoriteList, 'favoriteList');
  const [favoriteList, setFavoriteList] = useState([]);

  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const token = localStorage.getItem('accessToken');

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
        } else {
          setFavoriteList(res.data.data);
          console.log(res.data, '200');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // const makeList = favoriteList => {
  //   const newList = favoriteList.map((h, index) => ({
  //     hospitalCode: h.hospitalCode,
  //     hospitalId: h.hospitalId,
  //     hospitalName: h.hospitalName,
  //     hospitalOpen: h.hospitalOpen,
  //     hospitalPart: h.hospitalPart,
  //     hospitalTel: h.hospitalTel,
  //     hospitalTime: h.hospitalTime,
  //     hospitalX: h.hospitalX,
  //     hospitalY: h.hospitalY,
  //     hospitalDistance: getDistance(
  //       position[0],
  //       position[1],
  //       h.hospitalY,
  //       h.hospitalX,
  //     ),
  //   }));
  //   setHospitalList(newList);
  // };
  console.log(favoriteList, 'favoriteList');

  useEffect(() => {
    if (token) {
      getFavoriteList();
      // makeList();
    }
  }, []);
  return (
    <SContainer>
      {console.log(favoriteList)}
      {/* {favoriteList ? ({favoriteList.map((faovrite, index) => (
        <SLink
          to={`/hospital/${faovrite.hospitalId}`}
          key={faovrite.hospitalName}
          state={{ information: faovrite }}
        >
          <HospitalCard hospital={faovrite} index={index} />
        </SLink>
      ))}) : null} */}

      {favoriteList?.map((faovrite, index) => (
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

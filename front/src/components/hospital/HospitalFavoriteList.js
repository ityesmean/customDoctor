/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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

  const getFavoriteList = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/hospital/marklist`,
        // { withCredentials: true },
        { hour: currentHours, min: currentMinutes, day: currentDay },
        { headers: { Authorization: `${token}` } },
      );
      // if (res.data.status_code === 204) {
      //   console.log(res.data.data, '204');
      // } else {
      setFavoriteList(res.data.data);
      console.log(res.data.data, '200');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // const getFavoriteList = async () => {
    //   try {
    //     const res = await axios.post(
    //       `${process.env.REACT_APP_API_URL}/user/hospital/marklist`,
    //       // { withCredentials: true },
    //       { hour: currentHours, min: currentMinutes, day: currentDay },
    //       { headers: { Authorization: `${token}` } },
    //     );
    //     // if (res.data.status_code === 204) {
    //     //   console.log(res.data.data, '204');
    //     // } else {
    //     setFavoriteList(res.data.data);
    //     console.log(res.data.data, '200');
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    if (token) {
      getFavoriteList();
    }
  }, []);
  return (
    <SContainer>
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

/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { hospitalFavoriteState } from '../../atoms';
import HospitalCard from './HospitalCard';

const SContainer = styled.div``;

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function hospitalFavoriteList() {
  const favoriteList = useRecoilValue(hospitalFavoriteState);
  console.log(favoriteList, 'favoriteList');

  return (
    <SContainer>
      {favoriteList.map((faovrite, index) => (
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

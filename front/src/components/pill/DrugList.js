/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { API_URL_DRUG } from '../../api/api';

import { medicineSearchResult } from '../../atoms';
// import styled from 'styled-components';

import DrugCard from './DrugCard';

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
function DrugList() {
  const drugList = useRecoilValue(medicineSearchResult);
  console.log(drugList, 'here');

  return (
    <div>
      {drugList ? (
        <>
          {drugList.map(drug => (
            // <SLink to={`/pill/${drug.drugId}`} state={`${drug.drugId}`}>
            <DrugCard card={drug} key={drug.drugId} />
            // </SLink>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default DrugList;

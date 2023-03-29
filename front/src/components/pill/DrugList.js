import React from 'react';
import { useRecoilValue } from 'recoil';
import { medicineSearchResult } from '../../atoms';
// import styled from 'styled-components';

import DrugCard from './DrugCard';

function DrugList() {
  const drugList = useRecoilValue(medicineSearchResult);
  console.log(drugList, 'here');

  return (
    <div>
      {drugList ? (
        <>
          {drugList.map(drug => (
            <DrugCard card={drug} key={drug.drug_Name} />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default DrugList;

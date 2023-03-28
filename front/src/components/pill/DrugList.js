import React from 'react';
// import styled from 'styled-components';

import DrugCard from './DrugCard';

function DrugList() {
  const drugList = [
    {
      drugName: '타이레놀',
      drugIngre: '아세트아미노펜',
    },
    {
      drugName: '이지앤식스',
      drugIngre: 'ㅇㄹㄴㄴ',
    },
  ];

  return (
    <div>
      {drugList ? (
        <>
          {drugList.map(drug => (
            <DrugCard card={drug} key={drug.drugName} />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default DrugList;

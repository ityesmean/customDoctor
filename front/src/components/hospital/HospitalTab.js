/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import HospitalBasic from './HospitalBasic';
import HospitalDesc from './HospitalDesc';

const SContainer = styled.div``;

const STabTitle = styled.ul`
  /* padding-right: 10vw; */
  padding: 1vw 0;
  .active {
    font-weight: bold;
    border-bottom: 1vw;
  }
`;

const STitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  /* justify-content: space-around; */
`;

const STabLi = styled.li`
  padding: 1vw 3vw;
  margin: 0 2vw;
`;

const STabContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 5vw 10vw;
  margin: 0 0 2vw 0;
`;

function HospitalTab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const tabArr = [
    {
      tabTitle: '진료 정보',
      tabCont: <HospitalBasic />,
      // tabCont: <div>1</div>,
    },
    {
      tabTitle: '병원 정보',
      tabCont: <HospitalDesc />,
      // tabCont: <div>2</div>,
    },
  ];

  return (
    <SContainer>
      <STabTitle className="tabs is-boxed">
        <STitleBox>
          <STabLi
            className={activeIndex === 0 ? 'active' : ''}
            onClick={() => tabClickHandler(0)}
          >
            진료 정보
          </STabLi>
          <STabLi
            className={activeIndex === 0 ? 'active' : ''}
            onClick={() => tabClickHandler(1)}
          >
            병원 정보
          </STabLi>
        </STitleBox>
      </STabTitle>
      <STabContent>{tabArr[activeIndex].tabCont}</STabContent>
    </SContainer>
  );
}

export default HospitalTab;

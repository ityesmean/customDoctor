/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import styled from 'styled-components';

// import { useRecoilValue } from 'recoil';

// import { drugDetailInfo, drugAvoidInfo } from '../../atoms';

const SContainer = styled.div``;

const STabTitle = styled.ul`
  /* padding-right: 10vw; */
  padding: 1vw 0;
  .active {
    border: solid 1px #00c192;
    padding: 1vw 3vw;
    color: #00c192;
    border-radius: 15px;
    font-weight: bold;
  }
`;

const STitleBox = styled.div`
  display: flex;
  justify-content: space-around;
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
  background-color: #f1f3f4;
`;

function PillTab({ detailInfo }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  // const detailInfo = useRecoilValue(drugDetailInfo);
  // const avoidInfo = useRecoilValue(drugAvoidInfo);

  const tabContArr = [
    {
      tabTitle: '탭1',
      tabCont: <div>{detailInfo.data.drugDescEffect}</div>,
    },
    {
      tabTitle: '탭2',
      tabCont: <div>{detailInfo.data.drugDescSafety}</div>,
    },
    {
      tabTitle: '탭4',
      tabCont: <div>{detailInfo.data.drugDescUse}</div>,
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
            효능효과
          </STabLi>
          <STabLi
            className={activeIndex === 1 ? 'active' : ''}
            onClick={() => tabClickHandler(1)}
          >
            안전사용
          </STabLi>
          <STabLi
            className={activeIndex === 2 ? 'active' : ''}
            onClick={() => tabClickHandler(2)}
          >
            사용법
          </STabLi>
        </STitleBox>
      </STabTitle>

      {tabContArr[activeIndex].tabCont.props.children !== 'null' ? (
        <STabContent>{tabContArr[activeIndex].tabCont}</STabContent>
      ) : (
        <STabContent>내용없음</STabContent>
      )}
    </SContainer>
  );
}
export default PillTab;

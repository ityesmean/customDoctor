/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { drugDetailInfo, drugAvoidInfo } from '../../atoms';

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
  background-color: #f1f3f4;
`;

function PillTab() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = index => {
    setActiveIndex(index);
  };
  const detailInfo = useRecoilValue(drugDetailInfo);
  const avoidInfo = useRecoilValue(drugAvoidInfo);

  // console.log(detailInfo, 'detailInfo');
  // console.log(detailInfo.data, 'detailInfo.data');
  // console.log(avoidInfo, 'avoidInfo');

  const tabContArr = [
    {
      tabTitle: '탭1',
      tabCont: <div>{detailInfo.data.drugDescEffect}</div>,
    },
    {
      tabTitle: '탭2',
      tabCont: <div> {detailInfo.data.drugDescSafety} </div>,
    },
    {
      tabTitle: '탭3',
      tabCont: <div>{avoidInfo.data}</div>,
    },
    {
      tabTitle: '탭4',
      tabCont: <div> {detailInfo.data.drugDescUse} </div>,
    },
  ];
  // console.log(tabContArr[0].tabCont, 'tabContArr[0]');
  // console.log(
  //   tabContArr[0].tabCont.props.children,
  //   'tabContArr[0]props.children',
  // );
  // console.log(
  //   tabContArr[0].tabCont.props.children.length,
  //   'tabContArr[0]props.children.length',
  // );
  // console.log(
  //   tabContArr[1].tabCont.props.children,
  //   'tabContArr[1]props.children',
  // );
  // console.log(
  //   tabContArr[1].tabCont.props.children.length,
  //   'tabContArr[1]props.children.length',
  // );
  // console.log(
  //   tabContArr[2].tabCont.props.children.length,
  //   'tabContArr[2]props.children.length',
  // );
  // console.log(
  //   tabContArr[3].tabCont.props.children.length,
  //   'tabContArr[3]props.children.length',
  // );
  // console.log(tabContArr[1].tabCont.children[2]);

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
            병용금기
          </STabLi>
          {}
          <STabLi
            className={activeIndex === 3 ? 'active' : ''}
            onClick={() => tabClickHandler(3)}
          >
            사용법
          </STabLi>
        </STitleBox>
      </STabTitle>
      {tabContArr[activeIndex].tabCont.props.children.length > 4 ? (
        <STabContent>{tabContArr[activeIndex].tabCont}</STabContent>
      ) : (
        <STabContent>내용없음</STabContent>
      )}
    </SContainer>
  );
}
export default PillTab;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import styled from 'styled-components';

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

  const tabContArr = [
    {
      tabTitle: '탭1',
      tabCont: <div> 탭1 내용 </div>,
    },
    {
      tabTitle: '탭2',
      tabCont:
        '1. 다음 환자에는 투여하지 말 것.이 약은 유당을 함유하고 있으므로, 갈락토오스 불내성(galactose intolerance), Lapp 유당분해효소 결핍증(Lapp lactase deficiency) 또는 포도당-갈락토오스 흡수장애(glucose-galactose malabsorption) 등의 유전적인 문제가 있는 환자에게는 투여하면 안된다.      2. 이상반응 1) 모사프리드시트르산염 서방정의 이상반응 기능성 소화불량증 환자 119명을 대상으로 한 무작위배정, 이중 눈가림, 활성대조 임상시험에서 총 20명의 환자에서 이상반응이 발생하였고, 발생률은 시험군(서방정) 20.00% (12/60명, 18건), 대조군(일반정)은 13.56% (8/59명, 11건)로 조사되었다. 시험군과 대조군 모두에서 중대한 이상반응은 발생하지 않았다. 임상약과의 인과관계를 배제할 수 없는 약물이상반응 발생률은 시험군 3.33% (2/60명, 4건)로 구역 1.67%(1/60명, 2건), 위창자내공기참, 혈액중성지방증가 각 1.67%(1/60명, 1건)이 발생하였고, 대조군 6.78% (4/59명, 7건)로 구역 3.39%(2/59명, 2건), 복부불쾌감, 변비, 설사, 구토, 부종이 각 1.69%(1/59명, 1건)이 발생하였다. 2) 모사프리드시트르산염 일반제제(1일 3회 복용)에서 보고된 이상반응 998례 중 40례(4.0%)에서 이상반응이 나타났다. 주요한 이상반응으로는 설사·연변(1.8%), 구갈(0.5%), 권태감(0.3%)등이 있다.임상검사치에서는 792례중 30례(3.8%)에서 이상변동이 보였다. 주요 내용으로는 호산구증가증(1.1%), 중성지방의 상승(1.0%), AST(GOT), ALT(GPT), ALP 및 γ-GTP의 상승(각 0.4%)등이 있다.',
    },
    {
      tabTitle: '탭3',
      tabCont: <div> 탭3 내용 </div>,
    },
    {
      tabTitle: '탭4',
      tabCont: '탭4 내용',
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
            병용금기
          </STabLi>
          <STabLi
            className={activeIndex === 3 ? 'active' : ''}
            onClick={() => tabClickHandler(3)}
          >
            사용법
          </STabLi>
        </STitleBox>
      </STabTitle>
      <STabContent>{tabContArr[activeIndex].tabCont}</STabContent>
    </SContainer>
  );
}
export default PillTab;

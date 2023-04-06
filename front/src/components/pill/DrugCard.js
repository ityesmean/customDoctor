/* eslint-disable prefer-template */
/* eslint-disable no-useless-return */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { PillBasket } from '../../assets/pilldata/index';

import { myBasketState } from '../../atoms';

const SPillCard = styled.div`
  width: 80vw;
  height: 35vw;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  display: flex;
  align-items: center;
  padding: 0vw 2vw 0vw 3vw;
  border-radius: 4vw;
  z-index: 999;
  margin: 5vw 0;
`;

const SImg = styled.img`
  width: 40vw;
  height: 30vw;
  /* padding-left: 3vw; */
  /* background-color: gray; */
  border-radius: 5vw;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const SRightBox = styled.div`
  width: 35vw;
  height: 30vw;
  margin-left: 3vw;
  padding-top: 3vw;
  display: block;
  align-content: space-around;
  /* padding: 1vw; */
`;

const SBasketButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  /* width: 20vw; */
  /* height: 7vw; */
  border: 1px solid #00c192;
  border-radius: 5vw;
  margin: 1vw 0;
  padding: 1vw;
  justify-content: space-around;
  cursor: pointer;
`;

const SButtonImg = styled.img`
  display: flex;
  height: 5vw;
  width: 5vw;
`;

const SBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transform: translateY(-110%);
`;

const SNameText = styled.div`
  /* width: 30vw; */
  font-size: 4vw;
  height: 100%;
`;

const SIngreText = styled.div`
  font-size: 3vw;
  width: 30vw;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all; // 문단으로 끊어져서 줄바꿈 됨
`;

function DrugCard({ card }) {
  const [myBasket, setMyBasket] = useRecoilState(myBasketState);

  const willAddDrug = {
    id: card.drugId,
    name: card.drugName,
    isChecked: 'unChecked',
  };

  const onClickAddDrugHandler = () => {
    const temp = JSON.parse(JSON.stringify([...myBasket]));
    for (const drug of myBasket) {
      if (drug.name === card.drugName) {
        return;
      }
    }
    setMyBasket([...temp, willAddDrug]);
  };
  return (
    <div>
      <SPillCard>
        <SLink to={`/pill/${card.drugId}`} state={`${card.drugId}`}>
          <SImg src={'https://' + card.drugImg} alt={card.drugImg} />
        </SLink>
        <SRightBox>
          <SNameText>{card.drugName}</SNameText>
          <SBox>
            {card.drugIngre !== 'null' ? (
              <SIngreText>{card.drugIngre}</SIngreText>
            ) : (
              <SIngreText>정보없음</SIngreText>
            )}
            <SBasketButton onClick={onClickAddDrugHandler}>
              <SButtonImg src={PillBasket} alt={PillBasket} />
              {/* <SButtonText>약바구니</SButtonText> */}
            </SBasketButton>
          </SBox>
        </SRightBox>
      </SPillCard>
    </div>
  );
}

DrugCard.propTypes = {
  card: PropTypes.shape({
    drugId: PropTypes.number,
    drugName: PropTypes.string,
    drugIngre: PropTypes.string,
    drugImg: PropTypes.string,
  }),
};

DrugCard.defaultProps = {
  card: {
    drugId: null,
    drugImg: null,
    drugName: null,
    drugIngre: null,
  },
};

export default DrugCard;

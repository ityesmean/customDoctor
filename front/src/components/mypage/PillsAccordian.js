/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-return */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

// import Under from '../assets/Under.png';
// import Up from '../assets/Up.png';

const SContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border: 1px solid gray;
  /* width: 100%; */
  margin: 5vw 0 5vw 0;
`;

const SHeader = styled.div`
  display: flex;
  align-items: center;
  /* height: 5vw; */
  width: 70vw;
  /* margin: 0 10vw 0 2.5vw; */
  background-color: #00c192;
  text-align: center;
  font-weight: 700;
  padding: 2vw;
  display: block;
  /* text-decoration: none; */
  color: #fff;
  /* transition: background-color 0.5s ease-in-out; */
  /* border-bottom: 1px solid darken(#38cc70, 5%); */
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const SContentsWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.5s ease;
`;

const SContent = styled.div`
  padding: 1vw 0 1vw 0;
  animation-name: loadEffect1;
  animation-duration: 1s;
  animation-delay: 0.6s;

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const SLine = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #f3f6fa;
  line-height: 0.1em;
`;

const SRow = styled.div`
  border-bottom: 1px solid #e1dcdc;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SImage = styled.img`
  width: 30vw;
  padding: 1vh 0 1vh 0;
`;

const SBox = styled.div`
  /* position: relative; */
  animation-name: loadEffect1;
  animation-duration: 1s;
  animation-delay: 0.6s;

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const SText = styled.div`
  font-weight: bold;
  padding: 1vh 0 1vh 0;
`;

const SDrugName = styled.div`
  width: 30vw;
  font-weight: bold;
  padding: 1vh 0 1vh 0;
`;

const SIngre = styled.div`
  font-weight: bold;
  padding: 1vh 0 1vh 0;
`;

const SMemoBigBox = styled.div`
  margin: 1vw 3vw;
  display: flex;
  justify-content: space-evenly;
`;

const SMemoBox = styled.div`
  /* margin: ;
  border: 1px solid gray; */
`;

const SMemo = styled.div`
  padding: 1vw 0 0 4vw;
`;

// const StextBox = styled.div`
//   width: 30vw;
// `;

const SButton = styled.div`
  top: 8px;
  right: 8px;
  font-size: 3vw;
  position: absolute;
  display: flex;
  align-items: center;
  /* transform: rotate(135deg); */
`;

const SDeleteButtonWrapper = styled.div`
  margin: 2vw;
  display: flex;
  justify-content: flex-end;
`;

const SPillListDeleteButton = styled.button`
  color: black;
  border: 1px solid #bdbdbd;
  padding: 1vw;
  background: none;
  border-radius: 10px;
`;

// const SUnder = styled.Under``

function PillsAccordian({ pillList }) {
  const parentRef = React.useRef(null);
  const childRef = React.useRef(null);

  const [isCollapse, setIsCollapse] = React.useState(false);
  const [pills, setPills] = useState([]);

  const handleButtonClick = React.useCallback(
    event => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  // 약봉지를 삭제하는 함수
  const onClickDeletePillListHandler = async () => {
    const check = confirm('삭제 하시겠습니까?');
    if (check) {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/drug/delete/${pillList.drugMyId}`,
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
      location.reload();
    } else {
      return;
    }
  };

  const parentRefHeight = parentRef.current?.style.height ?? '0px';

  const buttonText = parentRefHeight === '0px' ? '▲' : '▼';
  // const buttonText = parentRefHeight === '0px' ? '열기' : '닫기';
  const getPillAccordian = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/drug/mypill/${pillList.drugMyId}`)
      .then(res => {
        setPills(res.data.data);
        console.log(res.data.data, 'Pills');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPillAccordian();
  }, []);

  return (
    <SContainer>
      <SHeader onClick={handleButtonClick}>
        {pillList.drugMyTitle}
        <SButton>{buttonText}</SButton>
      </SHeader>
      <SLine />
      <SContentsWrapper ref={parentRef}>
        <SContent ref={childRef}>
          <SBox>
            {pills != null
              ? pills.map(pill => (
                  <SLink
                    to={`/pill/${pill.drugId.drug_id}`}
                    state={`${pill.drugId.drug_id}`}
                  >
                    <SRow key={pill.drugMyPillId}>
                      <SImage
                        src={`https://${pill.drugId.drug_img}`}
                        alt="drugImg"
                      />
                      <div>
                        <SDrugName>{pill.drugId.drug_name}</SDrugName>
                      </div>
                    </SRow>
                  </SLink>
                ))
              : null}
          </SBox>
          <SMemoBigBox>
            <SText>메모</SText>
          </SMemoBigBox>
          <SMemoBox>
            <SMemo>{pillList.drugMyMemo}</SMemo>
          </SMemoBox>
          <SDeleteButtonWrapper>
            <SPillListDeleteButton
              type="button"
              onClick={onClickDeletePillListHandler}
            >
              삭제
            </SPillListDeleteButton>
          </SDeleteButtonWrapper>
        </SContent>
      </SContentsWrapper>
    </SContainer>
  );
}

PillsAccordian.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    pillGroup: PropTypes.arrayOf(
      PropTypes.shape({
        pillTitle: PropTypes.string,
        pillIngre: PropTypes.string,
      }),
    ),
    memo: PropTypes.string,
  }),
};

PillsAccordian.defaultProps = {
  data: null,
};

export default PillsAccordian;

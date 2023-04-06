/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { hospitalBasicState, hospitalDescState, loginState } from '../../atoms';
import { API_URL_USER } from '../../api/api';
import Favorites from '../../assets/Favorites.png';
import RedFavorites from '../../assets/RedFavorites.png';

const SContainer = styled.div``;

const FirstBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Treat = styled.div`
  color: #00c192;
  font-weight: bold;
  font-size: x-large;
`;

const Favorite = styled.img`
  width: 5vw;
`;

const STitleText = styled.div`
  font-size: bold;
  font-weight: bold;
  padding: 3vw 0;
`;

const SGreenBox = styled.div`
  background-color: #00c192;
  border-radius: 2vw;
  display: flex;
  justify-content: space-around;
  margin-bottom: 3vw;
`;

const SGreenSmallBox = styled.div`
  margin: 2vw 2vw;
`;

const SGreenText = styled.div`
  color: white;
  /* font-size: bold; */
  font-weight: bold;
  padding-bottom: 2vw;
`;

const SGreenTime = styled.div`
  color: white;
  /* font-size: bold; */
  /* font-weight: bold; */
`;

const STimeTable = styled.div`
  border-radius: 2vw;
  border: 1px solid #00c192;
  width: 80vw;
`;

const STimeBox = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #d9d9d9;
  margin: 2vw 0;
`;

const STimeEndBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2vw 0;
`;

const STimeText = styled.div`
  margin-bottom: 2vw;
`;

const STime = styled.div``;

const STimeRedText = styled.div`
  color: red;
  margin-bottom: 2vw;
`;
const STimeRed = styled.div`
  color: red;
`;

const SDataBox = styled.div``;

const SAddress = styled.div``;

const SDepartment = styled.div``;

const STelephone = styled.div``;

const SParking = styled.div``;

const SText = styled.div``;

const SLink = styled.a`
  text-decoration: none;
`;

const SListText = styled.div`
  display: inline-block;
  border-radius: 5px;
  background-color: #eef1fd;
  padding: 1vw 3vw;
  margin: 1vw 1vw;
`;

function HospitalBasic(props) {
  const basicInfo = useRecoilValue(hospitalBasicState);
  const descInfo = useRecoilValue(hospitalDescState);
  const logininfo = useRecoilValue(loginState);

  const currentTime = new Date();
  const currentDay = currentTime.getDay();

  const departmentList = [];
  for (let i = 0; i < basicInfo.hospitalPart.length; i++) {
    if (i % 2 === 0) {
      departmentList.push(basicInfo.hospitalPart[i]);
    }
  }
  // 즐겨찾기(찜하기) 기능
  const [like, setLike] = useState();
  // console.log(like);
  // const [trigger, setTrigger] = useState(like === 'like' ? true : false);

  const token = localStorage.getItem('accessToken');

  const checkFavorite = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/user/hospital/statusmark`,
        {
          hospitalId: `${basicInfo.hospitalId}`,
          status: !like,
        },
        {
          headers: { Authorization: `${token}` },
        },
      );
      setLike(!like);
    } catch (err) {
      console.log(err);
    }
  };

  // TimeTable 전체가 null 인지 아닌지 확인 하여 word 변경
  let word = '';
  if (basicInfo.hospitalTime === null) {
    word = '정보없음';
  } else if (basicInfo.hospitalTime !== null) {
    word = '휴진';
  }
  let todaytime = '';
  if (basicInfo.hospitalTime !== null) {
    if (basicInfo.hospitalTime.hospitalTimeMon !== null && currentDay === 1) {
      todaytime = basicInfo.hospitalTime.hospitalTimeMon;
    } else if (basicInfo.hospitalTime.hospitalTimeMon === null) {
      todaytime = '정보없음';
    }
    if (basicInfo.hospitalTime.hospitalTimeTue !== null && currentDay === 2) {
      todaytime = basicInfo.hospitalTime.hospitalTimeTue;
    } else if (basicInfo.hospitalTime.hospitalTimeTue === null) {
      todaytime = '정보없음';
    }
    if (basicInfo.hospitalTime.hospitalTimeWen !== null && currentDay === 3) {
      todaytime = basicInfo.hospitalTime.hospitalTimeWen;
    } else if (basicInfo.hospitalTime.hospitalTimeWen === null) {
      todaytime = '정보없음';
    }
    if (basicInfo.hospitalTime.hospitalTimeThu !== null && currentDay === 4) {
      todaytime = basicInfo.hospitalTime.hospitalTimeThu;
    } else if (basicInfo.hospitalTime.hospitalTimeThu === null) {
      todaytime = '정보없음';
    }
    if (basicInfo.hospitalTime.hospitalTimeFri !== null && currentDay === 5) {
      todaytime = basicInfo.hospitalTime.hospitalTimeFri;
    } else if (basicInfo.hospitalTime.hospitalTimeFri === null) {
      todaytime = '정보없음';
    }
    if (basicInfo.hospitalTime.hospitalTimeSat !== null && currentDay === 6) {
      todaytime = basicInfo.hospitalTime.hospitalTimeSat;
    } else if (
      basicInfo.hospitalTime.hospitalTimeSat === null &&
      currentDay === 6
    ) {
      todaytime = '정보없음';
    }
    if (basicInfo.hospitalTime.hospitalTimeSun !== null && currentDay === 0) {
      todaytime = basicInfo.hospitalTime.hospitalTimeSun;
    } else if (basicInfo.hospitalTime.hospitalTimeSun === null) {
      todaytime = '정보없음';
    }
  } else {
    todaytime = '정보없음';
  }

  // 로그인 안한 상태일때 로그인하러 이동하는지 alert
  const saveConfirm = function () {
    if (confirm('로그인하시겠습니까?')) {
      location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
      console.log('이동');
    } else {
      console.log('남음');
    }
  };

  useEffect(() => {
    const fetchIsLike = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/hospital/ismark`,
          { hospitalId: `${basicInfo.hospitalId}` },
          { headers: { Authorization: `${token}` } },
        );
        setLike(!res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIsLike();
  }, [like]);

  return (
    <SContainer>
      <FirstBox>
        <Treat>{basicInfo.hospitalOpen ? '진료중' : '진료 종료'}</Treat>
        {/* 로그인 했고 좋아요가 되어있을때 */}
        {/* {logininfo && like !== true && like !== undefined ? ( */}
        {logininfo !== false ? (
          like === false ? (
            <Favorite
              src={RedFavorites}
              alt="RedFavorites"
              onClick={() => {
                checkFavorite();
              }}
            />
          ) : (
            <Favorite
              src={Favorites}
              alt="Favorites"
              onClick={() => {
                checkFavorite();
              }}
            />
          )
        ) : (
          <div> </div>
        )}
        {logininfo === false && (
          <Favorite
            src={Favorites}
            alt="Favorites"
            onClick={() => saveConfirm()}
          />
        )}
      </FirstBox>
      <STitleText>진료 시간</STitleText>
      <SGreenBox>
        <SGreenSmallBox>
          <SGreenText>오늘</SGreenText>
          {todaytime !== 'null' && <SGreenTime>{todaytime}</SGreenTime>}
          {todaytime === 'null' && <SGreenTime>휴진</SGreenTime>}
        </SGreenSmallBox>
      </SGreenBox>
      <STimeTable>
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeMon.length !== 4 ? (
          <STimeBox>
            <STimeText>월요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeMon}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeRedText>월요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeBox>
        )}
        {/* {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeMon.length !== 4 ? (
          <STimeBox>
            <STimeText>월요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeMon}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeText>월요일</STimeText>
            <STime>정보없음</STime>
          </STimeBox>
        )} */}
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeTue.length !== 4 ? (
          <STimeBox>
            <STimeText>화요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeTue}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeRedText>화요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeBox>
        )}
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeWed.length !== 4 ? (
          <STimeBox>
            <STimeText>수요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeWed}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeRedText>수요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeBox>
        )}
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeThu.length !== 4 ? (
          <STimeBox>
            <STimeText>목요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeThu}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeRedText>목요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeBox>
        )}
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeFri.length !== 4 ? (
          <STimeBox>
            <STimeText>금요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeFri}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeRedText>금요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeBox>
        )}
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeSat.length !== 4 ? (
          <STimeBox>
            <STimeText>토요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeSat}</STime>
          </STimeBox>
        ) : (
          <STimeBox>
            <STimeRedText>토요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeBox>
        )}
        {basicInfo.hospitalTime !== null &&
        basicInfo.hospitalTime.hospitalTimeSun.length !== 4 ? (
          <STimeEndBox>
            <STimeText>일요일</STimeText>
            <STime>{basicInfo.hospitalTime.hospitalTimeSun}</STime>
          </STimeEndBox>
        ) : (
          <STimeEndBox>
            <STimeRedText>일요일</STimeRedText>
            <STimeRed>{word}</STimeRed>
          </STimeEndBox>
        )}
      </STimeTable>
      <SDataBox>
        {descInfo !== null && descInfo.hospitalAdd !== null ? (
          <SAddress>
            <STitleText>위치</STitleText>
            <SText>{descInfo.hospitalAdd}</SText>
          </SAddress>
        ) : (
          <SAddress>
            <STitleText>위치</STitleText>
            <SText>정보없음</SText>
          </SAddress>
        )}
        <SDepartment>
          <STitleText>진료과목</STitleText>
          <SText>
            {departmentList.map(dep => (
              <SListText>{dep}</SListText>
            ))}
          </SText>
        </SDepartment>
        <STelephone>
          <STitleText>전화번호</STitleText>
          <SText>{basicInfo.hospitalTel}</SText>
        </STelephone>
        {descInfo !== null && descInfo.hospitalParking !== null ? (
          <SParking>
            <STitleText>주차 정보</STitleText>
            <SListText>주차 가능</SListText>
          </SParking>
        ) : (
          <SParking>
            <STitleText>주차 정보</STitleText>
            <SListText>주차 불가</SListText>
          </SParking>
        )}
      </SDataBox>
    </SContainer>
  );
}

export default HospitalBasic;

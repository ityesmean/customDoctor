/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { hospitalBasicState, hospitalDescState } from '../../atoms';
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

const SListText = styled.div`
  display: inline-block;
  border-radius: 5px;
  background-color: #eef1fd;
  padding: 1vw 3vw;
  margin: 1vw 1vw;
`;

function HospitalBasic() {
  const basicInfo = useRecoilValue(hospitalBasicState);
  const descInfo = useRecoilValue(hospitalDescState);

  const departmentList = [];
  for (let i = 0; i < basicInfo.hospitalPart.length; i++) {
    if (i % 2 === 0) {
      departmentList.push(basicInfo.hospitalPart[i]);
    }
  }
  // 즐겨찾기(찜하기) 기능
  const [isWishAdd, setIsWishAdd] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [regis, setRegis] = useState(false);
  // const mounted = useRef(false);
  const token = localStorage.getItem('accessToken');
  // setTimeout(() => token, 500);
  // const FavoriteFun = 0
  const FavoriteFun = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/hospital/statusmark`,
        { withCredentials: true },
        {
          headers: { Authorization: `${token}` },
          body: { hospitalId: `${basicInfo.hospitalId}`, status: trigger },
        },
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const Registration = async () => {
    await axios
      .post(
        `${API_URL_USER}/hospital/ismy`,
        { withCredentials: true },
        {
          headers: { Authorization: `${token}` },
          body: { hospitalId: `${basicInfo.hospitalId}` },
        },
      )
      .then(res => {
        if (res.data.status_code === 204) {
          console.log(res, '204');
        } else {
          console.log(res);
          // setRegis(!regis);
        }
      })
      .catch(err => console.log(err));
  };
  // };/
  // }, 1000);'
  useEffect(() => {
    Registration();
  }, []);

  return (
    <SContainer>
      <FirstBox>
        <Treat>진료중</Treat>
        {trigger !== true ? (
          <Favorite
            src={Favorites}
            alt="Favorite"
            onClick={() => {
              setTrigger(!trigger);
              FavoriteFun();
              // Registration();
              // setRegis(!regis);
            }}
          />
        ) : (
          <Favorite
            src={RedFavorites}
            alt="RedFavorites"
            onClick={() => {
              setTrigger(!trigger);
              FavoriteFun();
              // Registration();
              // setRegis(!regis);
            }}
          />
        )}
      </FirstBox>
      <STitleText>진료 시간</STitleText>
      <SGreenBox>
        <SGreenSmallBox>
          <SGreenText>오늘</SGreenText>
          <SGreenTime>9:00 ~ 19:00</SGreenTime>
        </SGreenSmallBox>
        <SGreenSmallBox>
          <SGreenText>점심시간</SGreenText>
          <SGreenTime>12:30 ~ 14: 00</SGreenTime>
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
            <STimeRed>휴진</STimeRed>
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
            <STimeRed>휴진</STimeRed>
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
            <STimeRed>휴진</STimeRed>
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
            <STimeRed>휴진</STimeRed>
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
            <STimeRed>휴진</STimeRed>
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
            <STimeRed>휴진</STimeRed>
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
            <STimeRed>휴진</STimeRed>
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

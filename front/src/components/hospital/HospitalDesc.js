/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hospitalDescState, hospitalBasicState } from '../../atoms';
import HospitalSpecialTal from './HospitalSpecialTal';
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

const SDeviceTable = styled.div``;

const SSpecialBox = styled.div`
  /* border: 1px solid black; */
`;

const SListText = styled.div`
  display: inline-block;
  border-radius: 5px;
  background-color: #eef1fd;
  padding: 1vw 3vw;
  margin: 1vw 1vw;
`;

const SDoctorTable = styled.div``;

function HospitalDesc() {
  const descInfo = useRecoilValue(hospitalDescState);
  console.log(descInfo, 'descInfo');
  const basicInfo = useRecoilValue(hospitalBasicState);
  // console.log(basicInfo, 'basicInfo');

  const deviceItem = [];
  if (descInfo !== null && descInfo.hospitalDevice !== null) {
    const deviceList = descInfo.hospitalDevice.split('/');
    const result = {};
    deviceList.forEach(x => {
      result[x] = (result[x] || 0) + 1;
      // dictionary 길이
      // console.log(Object.keys(result).length);
    });
    //
    for (let i = 0; i < Object.keys(result).length; i++) {
      const deviceName = Object.keys(result);
      const devieCount = Object.values(result);
      deviceItem.push({ Name: deviceName[i], Count: devieCount[i] });
    }
  } else {
    console.log('device 없음');
  }

  const specialList = [];
  if (descInfo !== null && descInfo.hospitalSpecial !== null) {
    const special = descInfo.hospitalSpecial.split('/');
    specialList.push(special);
  } else {
    console.log('special 없음');
  }

  const deviceHeaders = [
    {
      text: '의료장비명',
      value: 'Name',
    },
    {
      text: '장비대수',
      value: 'Count',
    },
  ];

  const departmentHeaders = [
    {
      text: '진료과목',
      value: 'Name',
    },
    {
      text: '명수',
      value: 'Count',
    },
  ];

  const departmentList = [];
  const department = [];
  const departmentCount = [];
  for (let i = 0; i < basicInfo.hospitalPart.length; i++) {
    if (i % 2 === 0) {
      department.push(basicInfo.hospitalPart[i]);
    } else {
      departmentCount.push(basicInfo.hospitalPart[i]);
    }
  }
  for (let i = 0; i < departmentCount.length; i++) {
    if (departmentCount[i] !== 0) {
      // console.log(departmentCount[i], i, 'i');
      departmentList.push({ Name: department[i], Count: departmentCount[i] });
      // console.log(departmentList, 'departmentList');
    }
  }

  return (
    <SContainer>
      <FirstBox>
        <Treat>진료중</Treat>
        <Favorite src={Favorites} alt="Favorite" />
      </FirstBox>
      {descInfo !== null ? (
        <SContainer>
          <SDeviceTable>
            <STitleText>의료 장비</STitleText>
            <HospitalSpecialTal headers={deviceHeaders} items={deviceItem} />
          </SDeviceTable>
          <SSpecialBox>
            <STitleText>특수 진료 정보</STitleText>
            {specialList.map(spe => (
              <SListText>{spe}</SListText>
            ))}
            {/* <SListText>{descInfo.hospitalSpecial}</SListText> */}
          </SSpecialBox>
          <SDoctorTable>
            <STitleText>전문의</STitleText>
            <HospitalSpecialTal
              headers={departmentHeaders}
              items={departmentList}
            />
          </SDoctorTable>
        </SContainer>
      ) : (
        <SContainer>정보없음</SContainer>
      )}
    </SContainer>
  );
}

export default HospitalDesc;

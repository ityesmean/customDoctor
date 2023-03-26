import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HospitalCard from './HospitalCard';

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`

// props 로는 선택된 필터 버튼의 값이 전달된다. ex) distance, star, open
function HospitalList(props) {
  // 병원리스트 state
  // const [hospitalList,setHospitalList] = useState([]);

  console.log(props);
  const hospitalList = [
    {
      hospitalId: 1,
      hospitalName: '병원명 1',
      medicalDepartment: '정형외과',
      distance: 500,
      isMeter: true,
      xPosition: 36.35495410709628,
      yPosition: 127.34110805188085,
    },
    {
      hospitalId: 2,
      hospitalName: '병원명 2',
      medicalDepartment: '안과',
      distance: 130,
      isMeter: true,
      xPosition: 36.35469869768307,
      yPosition: 127.34110805188085,
    },
  ];
  // 병원 리스트 불러오는 요청
  // const getHospitalList = async() => {
  //     await axios.get(API).then(res => {
  //         const allList = res.data.data
  //         setHospitalList(allList)
  //     })
  // }

  // 컴포넌트 처음 나타날때 getHospitalList 함수 실행
  // useEffect(() => {
  //     getHospitalList()
  // }, [])

  return (
    <div>
      {/* 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {hospitalList ? (
        <>
          {hospitalList.map((hospitalCard, index) => (
            <SLink to={`/hospital/${hospitalCard.hospitalId}`}
              state={{ information: hospitalCard }}>
              <HospitalCard
                card={hospitalCard}
                index={index}
                key={hospitalCard.hospitalName}
              />
            </SLink>
          ))}
        </>
      ) : null
      }
    </div >
  );
}

export default HospitalList;

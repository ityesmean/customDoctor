import React from 'react';

import PillsAccordian from './PillsAccordian';

// props 로는 선택된 필터 버튼의 값이 전달된다. ex) distance, star, open
function PillList(props) {
  // 병원리스트 state
  // const [hospitalList,setHospitalList] = useState([]);

  console.log(props);
  const pillLists = [
    {
      title: '감기약 처방전',
      pillGroup: [
        { pillTitle: '아토르반정', pillIngre: '아토르바스타틴칼슐' },
        { pillTitle: '에페린정', pillIngre: '에페리손염산염' },
        { pillTitle: '레바미드정', pillIngre: '레바미피드' },
      ],
      memo: '식후 30 분 복용 아침, 점심, 저녁 일 3회',
    },
  ];

  return (
    <div>
      {/* 병원 리스트가 있다면 병원 리스트 map으로 컴포넌트 호출 */}
      {pillLists ? (
        <>
          {pillLists.map(pilllist => (
            <PillsAccordian data={pilllist} key={pilllist.memo} />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default PillList;

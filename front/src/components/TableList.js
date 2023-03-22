import React from 'react';
import styled from 'styled-components';
import Table from '../components/common/Table';

const SgraphContainer = styled.div``;

function TableList() {
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessor: 'MachineName',
  //       Header: '의료장비명',
  //     },
  //     {
  //       accessor: 'MachineCount',
  //       Header: '장비대수',
  //     },
  //   ],
  //   [],
  // );

  // const machineList = useMemo(
  //   () => [
  //     { machineName: '유방촬영장치', machineCount: 2 },
  //     { machineName: 'CT', machineCount: 1 },
  //     { machineName: '골밀도검사기', machineCount: 3 },
  //     { machineName: '초음파영상진단기', machineCount: 2 },
  //   ],
  //   [],
  // );

  // const data = useMemo(() =>
  //   machineList.map(list => ({
  //     의료장비명: list.machineName(),
  //     장비대수: list.machineCount(),
  //   })),
  // );
  // console.log(data);
  const headers = [
    {
      text: '의료장비명',
      value: 'Name',
    },
    {
      text: '장비대수',
      value: 'Count',
    },
  ];

  const items = [
    {
      Name: '유방촬영장치',
      Count: 2,
    },
    {
      Name: 'CT',
      Count: 1,
    },
    {
      Name: '골밀도검사기',
      Count: 3,
    },
    {
      Name: '초음파영상진단기',
      Count: 2,
    },
  ];

  return (
    <SgraphContainer>
      <Table headers={headers} items={items} />
    </SgraphContainer>
  );
}

export default TableList;

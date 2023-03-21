import React, { useMemo } from 'react';
import styled from 'styled-components';
import Table from '../components/common/Table';

const SgraphContainer = styled.div``;

function Test() {
  const columns = useMemo(
    () => [
      {
        accessor: '의료장비명',
        Header: '의료장비명',
      },
      {
        accessor: '장비대수',
        Header: '장비대수',
      },
    ],
    [],
  );

  const data = useMemo(() => [
    { medicalMachine: '유방촬영장치', machineCount: 2 },
    { medicalMachine: 'CT', machineCount: 1 },
    { medicalMachine: '골밀도검사기', machineCount: 3 },
    { medicalMachine: '초음파영상진단기', machineCount: 2 },
  ]);

  return (
    <SgraphContainer>
      <Table columns={columns} data={data} />
    </SgraphContainer>
  );
}

export default Test;

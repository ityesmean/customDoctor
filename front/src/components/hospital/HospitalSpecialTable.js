/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const STable = styled.table`
  border-spacing: 0;
  border: 1px;
  /* box-shadow: 0 0 0 1px #00c192; */
  border-style: solid;
  border-color: #00c192;
  border-collapse: collapse;
  border-radius: 15px;
`;

const STr = styled.tr`
  /* border-color: 1px solid #00c192; */
`;

const STheader = styled.th`
  width: 40vw;
  /* background-color: #00c192; */
  color: white;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
`;
const STd = styled.td`
  border-top: 1px solid #aaa;
`;
const STbody = styled.tbody``;

const SThead = styled.thead`
  background-color: #00c192;
`;

const SText = styled.div`
  padding: 1vw;
  font-size: 5vw;
  font-weight: bold;
`;

const SCount = styled.div`
  padding: 1vw 3vw;
  font-size: 5vw;
  text-align: center;
  vertical-align: middle;
`;

function HospitalSpecialTable({ headers, items }) {
  const headerKey = headers.map(header => header.value);
  return (
    <STable>
      <SThead>
        <STr>
          {headers.map(header => (
            <STheader key={header.text}>
              <SText>
                {header.text} {/* 컬럼명 바인딩 */}
              </SText>
            </STheader>
          ))}
        </STr>
      </SThead>
      <STbody>
        {items.map((item, index) => (
          <STr key={index}>
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map(key => (
              <STd key={key + index}>
                <SCount>
                  {item[key]} {/* key로 객체의 값을 출력 */}
                </SCount>
              </STd>
            ))}
          </STr>
        ))}
      </STbody>
    </STable>
  );
}

HospitalSpecialTable.propTypes = {
  headers: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  items: PropTypes.shape({
    Name: PropTypes.string,
    Count: PropTypes.number,
  }),
};

HospitalSpecialTable.defaultProps = {
  headers: null,
  items: null,
};

export default HospitalSpecialTable;

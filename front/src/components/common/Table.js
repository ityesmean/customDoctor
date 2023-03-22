/* eslint-disable array-callback-return */
import React from 'react';
// import { useTable } from 'react-table';
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

function Table({ headers, items }) {
  // eslint-disable-next-line react/prop-types
  const headerKey = headers.map(header => header.value);
  return (
    <STable>
      <SThead>
        <STr>
          {
            // eslint-disable-next-line react/prop-types
            headers.map(header => (
              <STheader key={header.text}>
                <SText>
                  {header.text} {/* 컬럼명 바인딩 */}
                </SText>
              </STheader>
            ))
          }
        </STr>
      </SThead>
      <STbody>
        {/* eslint-disable-next-line react/prop-types */}
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <STr key={index}>
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map(key => (
              // eslint-disable-next-line react/no-array-index-key
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

Table.propTypes = {
  // eslint-disable-next-line react/require-default-props
  headers: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  // eslint-disable-next-line react/require-default-props
  items: PropTypes.shape({
    Name: PropTypes.string,
    Count: PropTypes.number,
  }),
};

Table.defaultProps = {
  headers: null,
  items: null,
};

export default Table;

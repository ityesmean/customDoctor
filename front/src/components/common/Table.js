import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <td {...cell.getCellProps()}>
                  {cell.render('medicalMachine')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.shape({
    Header: PropTypes.string,
    accessor: PropTypes.string,
  }),
  data: PropTypes.shape({
    medicalMachine: PropTypes.string,
    machineCount: PropTypes.number,
  }),
};

Table.defaultProps = {
  columns: null,
  data: null,
};

export default Table;

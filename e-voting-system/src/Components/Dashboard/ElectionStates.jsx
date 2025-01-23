// src/components/ElectionStates/ElectionStates.jsx
import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./ElectionStates.css";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <span>
    Search:{" "}
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      placeholder="Filter by candidate name..."
      style={{
        fontSize: '1.1rem',
        border: '0',
      }}
    />
  </span>
);

const ElectionStates = ({ candidates }) => {
  const data = useMemo(() => candidates, [candidates]);

  const columns = useMemo(() => [
    {
      Header: "Candidate Name",
      accessor: "name",
    },
    {
      Header: "Votes",
      accessor: "votes",
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <section className="election-states">
      <h2>Election States</h2>

      <div className="table-controls">
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => {
            // Extract key from header group props
            const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={headerGroupKey} {...restHeaderGroupProps}>
                {headerGroup.headers.map(column => {
                  // Extract key from column props
                  const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <th key={columnKey} {...restColumnProps}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' ▼'
                            : ' ▲'
                          : ''}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map(row => {
              prepareRow(row);
              // Extract key for row
              const { key: rowKey, ...restRowProps } = row.getRowProps();
              return (
                <tr key={rowKey} {...restRowProps}>
                  {row.cells.map(cell => {
                    // Extract key for cell
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...restCellProps}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center", padding: "20px" }}>
                No candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ElectionStates;

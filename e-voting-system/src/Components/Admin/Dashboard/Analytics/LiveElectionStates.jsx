import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./LiveElectionStates.css";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <span className="search">
    Search:{" "}
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      placeholder="Filter by election name..."
      style={{
        fontSize: "1.1rem",
        border: "0",
        padding: "8px",
        borderRadius: "4px",
        textAlign: "center",
      }}
    />
  </span>
);

const LiveElectionStates = ({ elections }) => {
  // Prepare data and calculate vote percentages
  const data = useMemo(() => {
    return elections.map((election) => {
      const totalVotes = election.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
      return election.candidates.map((candidate) => ({
        electionName: election.name,
        candidateName: candidate.name,
        votePercentage: totalVotes === 0 ? 0 : ((candidate.votes / totalVotes) * 100).toFixed(2),
      }));
    }).flat(); // Flatten the array of candidates
  }, [elections]);

  const columns = useMemo(
    () => [
      {
        Header: "Election Name",
        accessor: "electionName",
      },
      {
        Header: "Candidate Name",
        accessor: "candidateName",
      },
      {
        Header: "Votes Percentage",
        accessor: "votePercentage",
        Cell: ({ value }) => `${value}%`, // Append percentage symbol
      },
    ],
    []
  );

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
      <h2>Live Election States</h2>

      <div className="table-controls">
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...restCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                No elections found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default LiveElectionStates;
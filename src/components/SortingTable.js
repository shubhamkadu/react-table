import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

import Data from "../Data.json";
import { COLUMNS } from "../columns";

function SortingTable() {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => Data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <>
      <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700">
        <table className="table-auto text-center w-full" {...getTableProps()}>
          <thead class="text-md  text-gray-100 uppercase ">
            {headerGroups.map((headerGroup) => (
              <tr class="" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="p-3" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div class="bg-gray-500/50 text-black rounded-md p-1 ">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? '🔼':'🔽'):''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  class=" border-b  dark:border-gray-700"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="p-4 text-gray-300 "
                        {...cell.getCellProps()}
                      >
                        <div className="bg-gray-400/10 backdrop-blur-md rounded-md  ">
                          {cell.render("Cell")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot class="text-md  text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default SortingTable;

import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import Data from "../Data.json";
import { COLUMNS } from "../columns";
import GlobalFilter from "./GlobalFilter";

import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

function FilteringTable() {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => Data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
    setPageSize,

    state,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,

      initialState: { pageIndex: 1 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700">
        <table className="table-auto text-center w-full" {...getTableProps()}>
          <thead class="text-md  text-gray-100 uppercase ">
            {headerGroups.map((headerGroup) => (
              <tr class="" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="p-3"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div class="bg-gray-500/50 flex text-black rounded-md p-1 ">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BsFillArrowUpCircleFill class="mx-2 mt-1 " />
                          ) : (
                            <BsFillArrowDownCircleFill class="mx-2 mt-1 " />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  class=" border-b  dark:border-gray-700"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="p-4 text-gray-400 "
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
        <div className="flex space-x-8 p-8 justify-center text-gray-400">
          <div className="flex space-x-2">
            <h1>Page</h1>
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <div>
            <label>Page Number</label> {""}
            <input
              className="bg-gray-500 outline-none rounded-sm"
              type="number"
              defaltValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </div>

          <select
            className="bg-gray-500 outline-none rounded-sm"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show{pageSize}
              </option>
            ))}
          </select>

          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button
            className="bg-gray-500 rounded-sm h-8 p-1"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className="bg-gray-500 rounded-sm h-8 p-1"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
}

export default FilteringTable;

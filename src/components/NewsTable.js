"use client";

import React from "react";
import { useTable, useSortBy } from "react-table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const NewsTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full light:bg-white border border-gray-200 shadow-md rounded-lg"
      >
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restCellProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr
                key={key}
                {...restCellProps}
                className="bg-gray-100 text-left dark:bg-gray-700"
              >
                {headerGroup.headers.map((column) => {
                  const headerProps = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  const { key, ...restHeaderProps } = headerProps;

                  return (
                    <th
                      key={column.id}
                      {...restHeaderProps}
                      className="border px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600 text-gray-900 dark:text-gray-300"
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <ChevronUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            )
                          ) : (
                            <ChevronUpIcon className="h-5 w-5 text-gray-300 dark:text-gray-500" />
                          )}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr
                key={key}
                {...restRowProps}
                className="even:bg-gray-50 dark:even:bg-gray-700" // 修改深色模式下的背景色
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className="border px-4 py-2"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;

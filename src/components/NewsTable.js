"use client";

import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const NewsTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              key={headerGroup.id} // 確保唯一的 key
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-100 text-left"
            >
              {headerGroup.headers.map(column => (
                <th
                  key={column.id} // 確保唯一的 key
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <div className="flex items-center justify-between">
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        )
                      ) : (
                        <ChevronUpIcon className="h-5 w-5 text-gray-300" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                key={row.original.id} // 使用唯一的 id 作為 key
                {...row.getRowProps()}
                className="even:bg-gray-50"
              >
                {row.cells.map(cell => (
                  <td
                    key={cell.column.id} // 使用唯一的 id 作為 key
                    {...cell.getCellProps()}
                    className="border px-4 py-2"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
import React, {useMemo} from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './columns'

export const Table = ({ songsData, songsDataSetter }) => {

    const columns = useMemo(() => COLUMNS(songsDataSetter), [songsDataSetter]);
    const data = useMemo(() => Array.isArray(songsData) ? songsData : [], [songsData]);

    const tableInstance = useTable({
        columns,
        data
    },
    useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div className="max-h-[60vh] overflow-y-auto">
            <table 
                {...getTableProps()} 
                className="min-w-full divide-y divide-gray-200"
            >
                <thead className="bg-gray-50 sticky top-0 z-10">
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th 
                                    {...column.getHeaderProps(column.getSortByToggleProps())} 
                                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider bg-gray-50"
                                    key={columnIndex}
                                >
                                    <div className="inline-flex items-center">
                                        {column.render('Header')}
                                        <span className="ml-1">
                                            {column.isSorted ? (column.isSortedDesc ? ' ⮟' : ' ⮝') : ''}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody 
                    {...getTableBodyProps()} 
                    className="bg-white divide-y divide-gray-200"
                >
                    {rows.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-100" key={rowIndex}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td 
                                        {...cell.getCellProps()} 
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                                        key={cellIndex}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

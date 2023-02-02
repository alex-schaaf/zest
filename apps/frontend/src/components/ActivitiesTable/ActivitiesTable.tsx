import React, { useMemo, useState } from "react"
import { StravaActivities } from "@prisma/client"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import dayjs from "dayjs"
import classNames from "classnames"
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"

interface Props {
  activities: StravaActivities[]
}

const columnHelper = createColumnHelper<StravaActivities>()

const columns = [
  columnHelper.accessor("startDate", {
    header: "Start Date",
    cell: (info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm"),
  }),
  columnHelper.accessor("distance", {
    header: "Distance [km]",
    cell: (info) => (info.getValue() / 1000).toFixed(1),
  }),
  columnHelper.accessor("time", {
    header: "Time [min]",
    cell: (info) => (info.getValue() / 60).toFixed(0),
  }),
  columnHelper.accessor("speed", {
    header: "Speed [m/s]",
    cell: (info) => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("elevationGain", {
    header: "Elevation Gain [m]",
    cell: (info) => info.getValue().toFixed(0),
  }),
]

const ActivitiesTable: React.FC<Props> = ({ activities }) => {
  const data = useMemo(() => [...activities], [activities])
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full text-sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="border border-gray-300 bg-gray-50 text-gray-800 shadow-sm"
          >
            {headerGroup.headers.map((header, idx) => (
              <th
                key={header.id}
                className={classNames("py-2 text-left font-semibold", {
                  "pl-2": idx === 0,
                  "select-none hover:cursor-pointer":
                    header.column.getCanSort(),
                })}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="inline-flex items-center gap-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: <TriangleUpIcon />,
                    desc: <TriangleDownIcon />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, idx) => (
          <tr key={row.id} className={classNames("py-2")}>
            {row.getVisibleCells().map((cell, idx) => (
              <td
                key={cell.id}
                className={classNames("border-b py-1 text-gray-800", {
                  "pl-2": idx === 0,
                })}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ActivitiesTable

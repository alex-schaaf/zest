import React, { useMemo } from "react"
import { StravaActivities } from "@prisma/client"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import dayjs from "dayjs"
import classNames from "classnames"

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full">
      <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-gray-300">
            {headerGroup.headers.map((header, idx) => (
              <th
                key={header.id}
                className={classNames("", {
                  "text-left": idx === 0,
                })}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, idx) => (
          <tr
            key={row.id}
            className={classNames("", { "bg-gray-100": idx % 2 === 0 })}
          >
            {row.getVisibleCells().map((cell, idx) => (
              <td
                key={cell.id}
                className={classNames("", {
                  "text-center": idx > 0,
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

import React from "react"
import classes from "./ActivityTable.module.css"
import { Activity } from "@/types/activity.types"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import dayjs from "dayjs"

interface ActivityTableProps {
  activities: Activity[]
}

const columnHelper = createColumnHelper<Activity>()

const columns = [
  columnHelper.accessor("startDate", {
    cell: (info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm"),
    header: "Timestamp",
  }),
  columnHelper.accessor("distance", {
    cell: (info) => (info.getValue() / 1000).toFixed(1),
    header: "Distance (km)",
  }),
  columnHelper.accessor("time", {
    cell: (info) =>
      dayjs.duration(info.getValue(), "seconds").format("H:mm:ss"),
    header: "Moving Time",
  }),
  columnHelper.accessor("speed", {
    cell: (info) => (1000 / info.getValue() / 60).toFixed(1),
    header: "Average Pace (min/km)",
  }),
  columnHelper.accessor("elevationGain", {
    cell: (info) => info.getValue().toFixed(0),
    header: "Elevation Gain (m)",
  }),
]

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className={classes.table}>
        <thead className={classes.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={classes.tr__header}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={classes.th}>
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
        <tbody className={classes.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={classes.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={classes.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActivityTable

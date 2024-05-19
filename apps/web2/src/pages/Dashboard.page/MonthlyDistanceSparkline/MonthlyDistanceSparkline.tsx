import React, { useMemo } from "react"
import { Activity } from "@/types/activity.types"
import { getMonthlyDistanceSparklineData } from "./lib"
import { AreaChart } from "@mantine/charts"
import dayjs from "dayjs"

interface MonthlyDistanceSparklineProps {
  activities: Activity[]
  width: number
  height: number
}

const MonthlyDistanceSparkline: React.FC<MonthlyDistanceSparklineProps> = ({
  activities,
  width,
  height,
}) => {
  const data = useMemo(
    () => (activities ? getMonthlyDistanceSparklineData(activities) : []),
    [activities]
  )

  return (
    <AreaChart
      data={data}
      dataKey="index"
      series={[
        { name: "distanceThisMonth", color: "teal" },
        { name: "distanceLastMonth", color: "grey", strokeDasharray: "4 4" },
      ]}
      referenceLines={[
        { x: dayjs().date() - 1, color: "teal" },
        { y: 0, color: "grey", strokeWidth: 2 },
        { x: dayjs().endOf("month").date() - 1, color: "grey", strokeWidth: 2 },
      ]}
      w={width}
      h={height}
      withXAxis={false}
      withYAxis={false}
      withDots={false}
      gridAxis="none"
      curveType="monotone"
      withTooltip={false}
    />
  )
}

export default MonthlyDistanceSparkline

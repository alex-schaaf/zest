import React, { useMemo } from "react"
import classes from "./YearlyDistanceChart.module.css"
import { Activity } from "@/types/activity.types"
import { AreaChart } from "@mantine/charts"
import { binActivitiesByWeek } from "./lib"
import { Paper, Text } from "@mantine/core"
import { capitalize } from "@/lib/helpers"

interface YearlyDistanceChartProps {
  activities: Activity[]
}

const YearlyDistanceChart: React.FC<YearlyDistanceChartProps> = ({
  activities,
}) => {
  const data = useMemo(() => binActivitiesByWeek(activities), [activities])

  return (
    <AreaChart
      data={data}
      h={200}
      dataKey={"week"}
      series={[{ name: "distance", color: "primary.6" }]}
      withXAxis={false}
      withYAxis={false}
      gridAxis="none"
      tooltipProps={{
        content: ({ label, payload }) => (
          <ChartTooltip label={label} payload={payload} />
        ),
      }}
      connectNulls={false}
      curveType="step"
      withDots={false}
      tooltipAnimationDuration={100}
    />
  )
}

export default YearlyDistanceChart

interface ChartTooltipProps {
  label: string
  payload: Record<string, any>[] | undefined
}

const ChartTooltip = ({ label, payload }: ChartTooltipProps) => {
  if (!payload) {
    return null
  }

  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md" key={label}>
      <Text fw={700} mb={5} size="sm">
        Week {label}
      </Text>
      {payload.slice(0, 1).map((item: any) => (
        <Text key={item.key} c={item.color} fz="sm">
          {capitalize(item.name)}: {item.value.toFixed(1)} km
        </Text>
      ))}
    </Paper>
  )
}

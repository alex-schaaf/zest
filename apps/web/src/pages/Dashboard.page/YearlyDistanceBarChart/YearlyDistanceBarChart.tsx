import React, { useMemo } from "react"
import classes from "./YearlyDistanceBarChart.module.css"
import { Activity } from "@/types/activity.types"
import { BarChart } from "@mantine/charts"
import dayjs from "dayjs"
import { Group, Paper, Text } from "@mantine/core"
import { IconRun } from "@tabler/icons-react"
import { capitalize } from "@/lib/helpers"

interface YearlDistanceBarChartProps {
  activities: Activity[]
}

const YearlDistanceBarChart: React.FC<YearlDistanceBarChartProps> = ({
  activities,
}) => {
  const data = useMemo(() => binActivitiesByWeek(activities), [activities])

  return (
    <Paper withBorder p="sm">
      <Text size="xs" c="dimmed" className={classes.title}>
        <Group gap="xs">
          <IconRun />
          <div>Weekly distance</div>
        </Group>
      </Text>
      <BarChart
        mt="xs"
        h={200}
        data={data}
        dataKey={"week"}
        series={[{ name: "distance", color: "primary.6" }]}
        withXAxis={false}
        withYAxis={false}
        gridAxis="none"
        cursorFill="dark.6"
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
      />
    </Paper>
  )
}

export default YearlDistanceBarChart

/* 
  This function takes an array of activities and bins their distance by week.
*/
const binActivitiesByWeek = (activities: Activity[]) => {
  const bins: Record<string, number> = {}
  const today = dayjs()
  const start = today.subtract(1, "year")

  for (let d = start; d.isBefore(today); d = d.add(1, "week")) {
    bins[`${d.year()}-${d.isoWeek()}`] = 0
  }

  activities.forEach((activity) => {
    const activityDate = dayjs(activity.startDate)
    if (activityDate.isBefore(start)) {
      return
    }

    const week = activityDate.isoWeek()
    const key = `${activityDate.year()}-${week}`
    if (!bins[key]) {
      bins[key] = 0
    }

    bins[key] += activity.distance / 1000
  })

  return Object.entries(bins).map(([k, v], index) => ({
    index: index,
    week: k,
    distance: v > 0 ? v : null,
    label: dayjs()
      .startOf("year")
      .startOf("month")
      .startOf("date")
      .add(parseInt(k), "week"),
  }))
}

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
      {payload.map((item: any) => (
        <Text key={item.key} c={item.color} fz="sm">
          {capitalize(item.name)}: {item.value.toFixed(1)} km
        </Text>
      ))}
    </Paper>
  )
}

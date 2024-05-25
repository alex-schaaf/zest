import useActivities from "@/hooks/useActivities"

import dayjs from "dayjs"
import { useMemo } from "react"
import MonthlyStatGrid from "./MonthlyStatGrid"
import { Paper, SimpleGrid, Stack, Title } from "@mantine/core"
import MonthlyDistanceSparkline from "./MonthlyDistanceSparkline"
import { useElementSize } from "@mantine/hooks"
import YearlyDistanceChart from "./YearlyDistanceChart"

const DashboardPage = () => {
  const { activities, isLoading, isError } = useActivities()
  const { ref, width } = useElementSize()

  const activitiesThisMonth = useMemo(
    () =>
      activities?.filter((activity) =>
        dayjs(activity.startDate).isAfter(dayjs().startOf("month"))
      ) ?? [],
    [activities]
  )

  const activitiesLastMonth = useMemo(
    () =>
      activities?.filter(
        (activity) =>
          dayjs(activity.startDate).isAfter(
            dayjs().startOf("month").subtract(1, "month")
          ) && dayjs(activity.startDate).isBefore(dayjs().subtract(1, "month"))
      ) ?? [],
    [activities]
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !activities) {
    return <div>Failed to load activities.</div>
  }

  return (
    <Stack>
      <Title order={2}>This month</Title>
      <MonthlyStatGrid
        activities={activitiesThisMonth}
        previousActivities={activitiesLastMonth}
      />
      <SimpleGrid cols={3} spacing="lg">
        <Paper withBorder ref={ref} p={15}>
          <MonthlyDistanceSparkline
            activities={activities.filter((activity) =>
              dayjs(activity.startDate).isAfter(
                dayjs().startOf("month").subtract(1, "month")
              )
            )}
            width={width}
            height={120}
          />
        </Paper>
      </SimpleGrid>
      <Title order={2}>Past year</Title>
      <Paper withBorder p="sm">
        <YearlyDistanceChart activities={activities} />
      </Paper>
    </Stack>
  )
}

export default DashboardPage

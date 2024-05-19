import useActivities from "@/hooks/useActivities"

import dayjs from "dayjs"
import { useMemo } from "react"
import MonthlyStatGrid from "./MonthlyStatGrid"
import { Stack, Title } from "@mantine/core"

const DashboardPage = () => {
  const { activities, isLoading, isError } = useActivities()
  // startDateGte: dayjs().startOf("month").subtract(1, "month").toDate(),

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
    </Stack>
  )
}

export default DashboardPage

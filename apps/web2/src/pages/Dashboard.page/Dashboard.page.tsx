import useActivities from "@/hooks/useActivities"

import dayjs from "dayjs"
import { useMemo } from "react"
import MonthlyStatGrid from "./MonthlyStatGrid"

const DashboardPage = () => {
  const { activities, isLoading, isError } = useActivities()
  // startDateGte: dayjs().startOf("month").subtract(1, "month").toDate(),

  console.log(dayjs().startOf("month").subtract(1, "month").toDate())

  console.log(activities?.length)

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
          ) && dayjs(activity.startDate).isBefore(dayjs().startOf("month"))
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
    <div>
      <MonthlyStatGrid
        activities={activitiesThisMonth}
        previousActivities={activitiesLastMonth}
      />
    </div>
  )
}

export default DashboardPage

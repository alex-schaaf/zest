import React from "react"
import { useSearchParams } from "react-router-dom"
import useActivities from "@/hooks/useActivities"
import dayjs from "dayjs"
import ActivitiesCalendar from "@/pages/Activities.page/ActivitiesCalendar"

interface ActivitiesCalendarProps {}

const ActivitiesCalendarContainer: React.FC<ActivitiesCalendarProps> = () => {
  const [searchParams, _] = useSearchParams()

  const { activities, isLoading, isError } = useActivities({
    startDateGte: dayjs(searchParams.get("date")).subtract(1, "month").toDate(),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!activities) {
    return <div>No activities found...</div>
  }

  return (
    <div>
      <ActivitiesCalendar activities={activities} />
    </div>
  )
}

export default ActivitiesCalendarContainer

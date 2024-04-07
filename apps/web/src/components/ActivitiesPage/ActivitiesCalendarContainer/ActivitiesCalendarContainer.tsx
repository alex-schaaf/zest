import React from "react"
import dayjs from "dayjs"

import ActivitiesCalendar from "@/components/ActivitiesPage/ActivitiesCalendar/ActivitiesCalendar"
import useActivities from "@/hooks/useActivities"
import { useSearchParams } from "react-router-dom"

const ActivitiesCalendarContainer: React.FC = () => {
  const [searchParams, _] = useSearchParams()

  const { activities } = useActivities({
    startDateGte: dayjs(searchParams.get("date")).subtract(1, "week").toDate(),
  })

  return <ActivitiesCalendar activities={activities || []} />
}

export default ActivitiesCalendarContainer

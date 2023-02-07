import React, { useState } from "react"
import dayjs from "dayjs"

import ActivitiesCalendar from "@/components/ActivitiesCalendar/ActivitiesCalendar"
import useActivities from "@/hooks/useActivities"
import Loading from "@/components/ui/Spinner"

const ActivitiesCalendarContainer: React.FC = () => {
  const [month, setMonth] = useState(dayjs().startOf("month"))

  const { activities, isLoading, isError } = useActivities(
    month.subtract(1, "week").toDate()
  )

  if (isLoading) return <Loading />
  if (isError) return <div>failed to fetch</div>

  return (
    <ActivitiesCalendar
      date={month}
      setDate={setMonth}
      activities={activities || []}
    />
  )
}

export default ActivitiesCalendarContainer

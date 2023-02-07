import React, { useState } from "react"
import dayjs from "dayjs"

import ActivitiesCalendar from "@/components/ActivitiesCalendar/ActivitiesCalendar"
import useActivities from "@/hooks/useActivities"

const ActivitiesCalendarContainer: React.FC = () => {
  const [month, setMonth] = useState(dayjs().startOf("month"))

  const { activities } = useActivities(month.subtract(1, "week").toDate())

  return (
    <ActivitiesCalendar
      date={month}
      setDate={setMonth}
      activities={activities || []}
    />
  )
}

export default ActivitiesCalendarContainer

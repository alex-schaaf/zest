import React from "react"
import { StravaActivities } from "@prisma/client"
import dayjs, { Dayjs } from "dayjs"
import classNames from "classnames"

interface Props {
  date: Dayjs
  activities: StravaActivities[]
}

const ActivitiesCalendar: React.FC<Props> = ({ date, activities }) => {
  const today = dayjs()

  const start = today.startOf("month")
  today.daysInMonth()

  const days: Dayjs[] = []

  // pad left with previous months days of the week
  for (let i = start.isoWeekday() - 1; i > 0; i--) {
    days.push(start.subtract(i, "days"))
  }

  for (let i = 0; i < today.daysInMonth(); i++) {
    days.push(start.add(i, "days"))
  }

  // pad right with next months days of the week
  for (let i = 1; i < 7 - today.endOf("month").isoWeekday() + 1; i++) {
    days.push(today.endOf("month").add(i, "days"))
  }

  const act: Record<string, StravaActivities[]> = {}
  days.forEach((day) => {
    act[day.format("YYYY-MM-DD")] = []
  })

  activities.forEach((activity) => {
    const date = dayjs(activity.startDate).format("YYYY-MM-DD")
    if (Object.keys(act).includes(date)) {
      act[date].push(activity)
    }
  })

  return (
    <>
      <div className="pb-6 text-center text-xl font-bold text-gray-500">
        {today.format("MMMM")} {today.format("YYYY")}
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
        {days.slice(0, 7).map((day) => (
          <div>{day.format("dddd")}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 border shadow-sm" id="calendar">
        {days.map((day, idx) => {
          const activities = act[day.format("YYYY-MM-DD")]

          return (
            <div
              className={classNames("h-24 p-2 text-center", {
                "bg-gray-50 text-gray-400": day.month() != today.month(),
                "border-t": idx >= 7,
                "border-l": day.isoWeekday() > 1,
              })}
              key={idx}
              data-cy={`calendar-day-${day.format("YYYY-MM-DD")}`}
            >
              <div className="text-left text-xs font-medium text-gray-400">
                {day.date()}
              </div>
              {activities.length > 0 && <div className="text-4xl">👟</div>}
              {activities.length > 0 && (
                <div className="mt-1 text-xs font-medium text-gray-400">
                  {activities.reduce(
                    (prev, curr) => prev + curr.distance / 1000,
                    0
                  )}{" "}
                  km
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ActivitiesCalendar

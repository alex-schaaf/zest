import React, { Dispatch, SetStateAction, useMemo } from "react"
import { StravaActivities } from "@prisma/client"
import dayjs, { Dayjs } from "dayjs"
import classNames from "classnames"
import Button from "../ui/Button"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

interface Props {
  date: Dayjs
  setDate: Dispatch<SetStateAction<Dayjs>>
  activities: StravaActivities[]
}

const ActivitiesCalendar: React.FC<Props> = ({ date, setDate, activities }) => {
  const days: Dayjs[] = useMemo(() => {
    const days: Dayjs[] = []
    // pad left with previous months days of the week
    for (let i = date.isoWeekday() - 1; i > 0; i--) {
      days.push(date.subtract(i, "days"))
    }
    for (let i = 0; i < date.daysInMonth(); i++) {
      days.push(date.add(i, "days"))
    }
    // pad right with next months days of the week
    for (let i = 1; i < 7 - date.endOf("month").isoWeekday() + 1; i++) {
      days.push(date.endOf("month").add(i, "days"))
    }
    return days
  }, [date])

  const act = useMemo(() => {
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
    return act
  }, [days, activities])

  return (
    <>
      <div className="flex justify-between pb-6 text-center text-xl font-bold text-gray-500">
        <Button
          onClick={() => setDate(date.subtract(1, "month"))}
          data-cy="calendar-back"
        >
          <ArrowLeftIcon />
        </Button>
        <div>
          {date.format("MMMM")} {date.format("YYYY")}
        </div>
        <div
          className={classNames({
            invisible: date.add(1, "month") > dayjs(),
          })}
        >
          <Button
            onClick={() => setDate(date.add(1, "month"))}
            data-cy="calendar-forward"
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
        {days.slice(0, 7).map((day, idx) => (
          <div key={idx}>{day.format("dddd")}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 border shadow-sm" id="calendar">
        {days.map((day, idx) => {
          const activities = act[day.format("YYYY-MM-DD")]

          return (
            <div
              className={classNames("h-24 p-2 text-center", {
                "bg-gray-50 text-gray-400": day.month() != date.month(),
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
                  {activities
                    .reduce((prev, curr) => prev + curr.distance / 1000, 0)
                    .toFixed(1)}{" "}
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

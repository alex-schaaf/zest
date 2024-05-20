import React, { useMemo } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useSearchParams } from "react-router-dom"
import { Activity } from "@/types/activity.types"
import classNames from "classnames"
import classes from "./ActivitiesCalendar.module.css"
import { IconRun } from "@tabler/icons-react"

interface Props {
  activities: Activity[]
}

const ActivitiesCalendar: React.FC<Props> = ({ activities }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const date = dayjs(searchParams.get("date"))

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
    const act: Record<string, Activity[]> = {}
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
      <div className={classes.calendar}>
        {days.map((day, idx) => {
          const activities = act[day.format("YYYY-MM-DD")]

          return (
            <div
              className={classNames(classes.calendar__day, {
                [classes.day__other_month]: day.month() != date.month(),
                [classes.border_t]: idx >= 7,
                [classes.border_l]: day.isoWeekday() > 1,
                [classes.day__today]: day
                  .startOf("day")
                  .isSame(dayjs().startOf("day")),
              })}
              key={idx}
              data-cy={`calendar-day-${day.format("YYYY-MM-DD")}`}
            >
              <div className={classes.day__date}>{day.date()}</div>
              {activities.length > 0 && (
                <div className={classes.day__icon}>
                  <IconRun />
                </div>
              )}
              {activities.length > 0 && (
                <div className={classes.day__distance}>
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

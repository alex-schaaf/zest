import { Activity } from "@/types/activity.types"
import dayjs, { Dayjs } from "dayjs"

export const getCalendarDays = (date: Dayjs) => {
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
}

export const getCalendarDayActivities = (
  calendarDays: Dayjs[],
  activities: Activity[]
) => {
  const calendarDayActivities: Record<string, Activity[]> = {}
  calendarDays.forEach((day) => {
    calendarDayActivities[day.format("YYYY-MM-DD")] = []
  })
  activities.forEach((activity) => {
    const date = dayjs(activity.startDate).format("YYYY-MM-DD")
    if (Object.keys(calendarDayActivities).includes(date)) {
      calendarDayActivities[date].push(activity)
    }
  })
  return calendarDayActivities
}

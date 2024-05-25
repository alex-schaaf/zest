import { Activity } from "@/types/activity.types"
import dayjs from "dayjs"

/* 
  This function takes an array of activities and bins their distance by week.
*/
export const binActivitiesByWeek = (activities: Activity[]) => {
  const bins: Record<string, number> = {}
  const today = dayjs()
  const start = today.subtract(1, "year")

  for (let d = start; d.isBefore(today); d = d.add(1, "week")) {
    bins[`${d.year()}-${d.isoWeek()}`] = 0
  }

  activities.forEach((activity) => {
    const activityDate = dayjs(activity.startDate)
    if (activityDate.isBefore(start)) {
      return
    }

    const week = activityDate.isoWeek()
    const key = `${activityDate.year()}-${week}`
    if (!bins[key]) {
      bins[key] = 0
    }

    bins[key] += activity.distance / 1000
  })

  return Object.entries(bins).map(([k, v], index) => ({
    index: index,
    week: k,
    distance: v > 0 ? v : 0,
    label: dayjs()
      .startOf("year")
      .startOf("month")
      .startOf("date")
      .add(parseInt(k), "week"),
  }))
}

import { Activity } from "@/types/activity.types"
import dayjs from "dayjs"

interface Data {
  index: number
  distanceThisMonth: number | null
  distanceLastMonth: number
}

export const getMonthlyDistanceSparklineData = (
  activities: Activity[]
): Data[] => {
  const now = dayjs()
  const last = now.subtract(1, "month")

  const thisMonth = cumsum(
    activities,
    now.startOf("month").toDate(),
    now.endOf("month").toDate()
  )
  const lastMonth = cumsum(
    activities,
    last.endOf("month").subtract(now.endOf("month").date(), "days").toDate(),
    last.endOf("month").toDate()
  )

  const data = []
  for (let i = 0; i < now.endOf("month").date(); i++) {
    data.push({
      index: i,
      distanceThisMonth: i < now.date() ? thisMonth[i].distance : null,
      distanceLastMonth: lastMonth[i].distance,
    })
  }

  return data
}

const cumsum = (activities: Activity[], start: Date, end: Date) => {
  const data = []
  let sum = 0
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const day = dayjs(d)
    sum = activities
      .filter((a) => dayjs(a.startDate).isSame(day, "day"))
      .reduce((prev, curr) => prev + curr.distance, sum)

    data.push({ startDate: day.toDate(), distance: sum })
  }

  return data
}

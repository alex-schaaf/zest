import dayjs, { Dayjs } from "dayjs"
import user from "./user"

export const generateActivities = (start: Dayjs) => {
  const activities = []

  let current = start
  const today = dayjs()

  while (current.isBefore(today.subtract(1, "week"))) {
    const nWeeklyActivities = Math.floor(Math.random() * 3 + 2)
    for (let i = 0; i < nWeeklyActivities; i++) {
      const dt = current.add(1, "week").unix() - current.unix()
      const unix = Math.random() * dt + current.unix()

      const distance = Math.random() * 10000 + 2500
      const speed = Math.random() + 2

      activities.push({
        id: Math.floor(Math.random() * 1000000),
        distance,
        startDate: dayjs.unix(unix).toDate(),
        type: "Run",
        time: distance / speed,
        elevationGain: Math.random() * 100 + 50,
        speed,
        active: true,
        userId: user.id,
      })
    }

    current = current.add(1, "week")
  }

  return activities
}

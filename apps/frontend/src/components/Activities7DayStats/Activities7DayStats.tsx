import { useDashboard } from "@/contexts/dashboard-context"
import { StravaActivities } from "@prisma/client"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import StatCard from "@/components/ui/StatCard"

interface ActivityStats {
  totalDistance: number
  totalTime: number
  totalElevation: number
  averageSpeed: number
}

const Activities7DayStats: React.FC = () => {
  const { activities } = useDashboard()

  const stats = useMemo(
    () =>
      getActivityStats(
        activities.filter(
          (act) =>
            dayjs(act.startDate) >= dayjs().startOf("day").subtract(7, "days")
        )
      ),
    [activities]
  )

  const statsPrevious = useMemo(
    () =>
      getActivityStats(
        activities.filter(
          (act) =>
            dayjs(act.startDate) >=
              dayjs().startOf("day").subtract(2, "week") &&
            dayjs(act.startDate) < dayjs().startOf("day").subtract(7, "days")
        )
      ),
    [activities]
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <StatCard
          title={"Total Distance"}
          value={stats.totalDistance}
          previousValue={statsPrevious.totalDistance}
          unit={"km"}
        />
        <StatCard
          title={"Total Time"}
          value={stats.totalTime}
          previousValue={statsPrevious.totalTime}
          unit={"min"}
          precision={0}
        />
        <StatCard
          title={"Total Elevation Gain"}
          value={stats.totalElevation}
          previousValue={statsPrevious.totalElevation}
          unit={"m"}
        />
      </div>
    </div>
  )
}

export default Activities7DayStats

export const getActivityStats = (
  activities: StravaActivities[]
): ActivityStats => {
  const totalDistance = activities.reduce(
    (prev, curr) => (prev += curr.distance / 1000),
    0
  )
  const totalTime = activities.reduce(
    (prev, curr) => (prev += curr.time / 60),
    0
  )
  const totalElevation = activities.reduce(
    (prev, curr) => (prev += curr.elevationGain),
    0
  )
  const averageSpeed =
    activities.reduce((prev, curr) => (prev += curr.speed), 0) /
    activities.length

  return { totalDistance, totalTime, totalElevation, averageSpeed }
}

/* eslint-disable react-hooks/exhaustive-deps */
import Stat from "@/components/Stat"
import { useDashboard } from "@/contexts/dashboard-context"
import { minutesToHoursAndMinutes } from "@/lib/time"
import { StravaActivities } from "@prisma/client"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import TrendBadge from "@/components/ui/TrendBadge"

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

  const { hours, minutes } = minutesToHoursAndMinutes(stats.totalTime)

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Stat className="flex-grow">
          <Stat.Title>Total Distance</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between">
              <div>{stats?.totalDistance?.toFixed(0)}km</div>
              <TrendBadge
                current={stats?.totalDistance}
                previous={statsPrevious?.totalDistance}
                unit={"km"}
              />
            </div>
          </Stat.Value>
        </Stat>
        <Stat className="flex-grow">
          <Stat.Title>Total Time</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between ">
              <div>
                {hours}h {minutes.toFixed(0)}min
              </div>
              <TrendBadge
                current={stats?.totalTime}
                previous={statsPrevious?.totalTime}
                unit={"min"}
              />
            </div>
          </Stat.Value>
        </Stat>
        <Stat className="flex-grow">
          <Stat.Title>Total Elevation Gain</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between ">
              <div>{stats?.totalElevation?.toFixed(0)}m</div>
              <TrendBadge
                current={stats?.totalElevation}
                previous={statsPrevious?.totalElevation}
                unit={"m"}
              />
            </div>
          </Stat.Value>
        </Stat>
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

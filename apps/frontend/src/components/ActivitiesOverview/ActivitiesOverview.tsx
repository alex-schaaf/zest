/* eslint-disable react-hooks/exhaustive-deps */
import Stat from "../Stat"
import { StravaActivities } from "@prisma/client"
import classNames from "classnames"
import React, { useMemo } from "react"

interface ActivityStats {
  totalDistance: number
  totalTime: number
  totalElevation: number
  averageSpeed: number
}

const getActivityStats = (activities: StravaActivities[]): ActivityStats => {
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

interface ActivitiesOverviewProps {
  start: Date
  activities: StravaActivities[]
}

const ActivitiesOverview: React.FC<ActivitiesOverviewProps> = ({
  start,
  activities,
}) => {
  const stats = useMemo(
    () =>
      activities &&
      start &&
      getActivityStats(
        activities.filter((act) => new Date(act.startDate) >= start)
      ),
    [activities]
  )

  const statsPrevious = useMemo(
    () =>
      activities &&
      start &&
      getActivityStats(
        activities.filter((act) => new Date(act.startDate) < start)
      ),
    [activities]
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Stat className="flex-grow">
          <Stat.Title>Total Distance</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between">
              <div>{stats?.totalDistance?.toFixed(0)} km</div>
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
              <div>{stats?.totalTime?.toFixed(0)} min</div>
              <TrendBadge
                current={stats?.totalTime}
                previous={statsPrevious?.totalTime}
              />
            </div>
          </Stat.Value>
        </Stat>
        {/* <Stat className="flex-grow">
          <Stat.Title>Average Speed</Stat.Title>
          <Stat.Value>{stats?.averageSpeed?.toFixed(2)} m/s</Stat.Value>
        </Stat> */}
        <Stat className="flex-grow">
          <Stat.Title>Total Elevation Gain</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between ">
              <div>{stats?.totalElevation?.toFixed(0)} min</div>
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

export default ActivitiesOverview

interface TrendBadgeProps {
  current: number
  previous: number
  unit?: string
}

export const TrendBadge: React.FC<TrendBadgeProps> = ({
  current,
  previous,
  unit,
}) => {
  const style = "text-sm px-2 py-1 rounded-md"

  if (current > previous) {
    const ratio = current - previous
    return (
      <div className={classNames(style, "bg-green-100 text-green-500")}>
        ↑ {ratio.toFixed(1)} {unit}
      </div>
    )
  } else {
    const ratio = previous - current
    return (
      <div className={classNames(style, "bg-red-100 text-red-500")}>
        ↓ {ratio.toFixed(1)} {unit}
      </div>
    )
  }
}

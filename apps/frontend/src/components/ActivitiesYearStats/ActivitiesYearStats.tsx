import useActivities from "@/hooks/useActivities"
import {
  getActivityStats,
  TrendBadge,
} from "@/components/ActivitiesOverview/ActivitiesOverview"
import Loading from "@/components/Loading"
import Stat from "@/components/Stat"
import React, { useMemo } from "react"
import { minutesToHoursAndMinutes } from "@/lib/time"

const ActivitiesYearStats: React.FC = () => {
  const start = new Date(new Date().getFullYear(), 0, 1)
  const { activities, isLoading, isError } = useActivities(
    start,
    undefined,
    !!start
  )
  const {
    activities: prevAct,
    isLoading: isLoadingPrev,
    isError: isErrorPrev,
  } = useActivities(
    new Date(new Date().getFullYear() - 1, 0, 1),
    new Date(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDate()
    ),
    !!start
  )

  const stats = useMemo(
    () => activities && getActivityStats(activities),
    [activities]
  )
  const statsPrev = useMemo(
    () => prevAct && getActivityStats(prevAct),
    [prevAct]
  )

  if (isLoading) return <Loading />
  if (isError) return <div>failed to fetch</div>

  function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return { hours, minutes }
  }

  const { hours, minutes } = minutesToHoursAndMinutes(stats?.totalTime)

  return (
    <div className="flex gap-4">
      <Stat className="flex-grow">
        <Stat.Title>Total Distance</Stat.Title>
        <Stat.Value>
          <div className="flex items-end justify-between ">
            <div>{stats?.totalDistance?.toFixed(0)}km</div>
            <TrendBadge
              current={stats?.totalDistance}
              previous={statsPrev?.totalDistance}
              unit={"km"}
            />
          </div>
        </Stat.Value>
      </Stat>
      <Stat className="flex-grow">
        <Stat.Title>Total Elapsed Time</Stat.Title>
        <Stat.Value>
          {hours}h {minutes.toFixed(0)}min
        </Stat.Value>
      </Stat>
      <Stat className="flex-grow">
        <Stat.Title>Total Elevation Gain</Stat.Title>
        <Stat.Value>
          <div className="flex items-end justify-between ">
            <div>{stats?.totalElevation?.toFixed(0)}m</div>
            <TrendBadge
              current={stats?.totalElevation}
              previous={statsPrev?.totalElevation}
              unit={"m"}
            />
          </div>
        </Stat.Value>
      </Stat>
    </div>
  )
}

export default ActivitiesYearStats

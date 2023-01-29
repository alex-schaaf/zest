import {
  getActivityStats,
  TrendBadge,
} from "@/components/Activities7DayStats/Activities7DayStats"
import Stat from "@/components/Stat"
import React, { useMemo } from "react"
import { minutesToHoursAndMinutes } from "@/lib/time"
import { useDashboard } from "@/contexts/dashboard-context"
import dayjs from "dayjs"

const ActivitiesYearStats: React.FC = () => {
  const { activities } = useDashboard()

  const stats = useMemo(
    () =>
      getActivityStats(
        activities.filter((a) => dayjs(a.startDate) >= dayjs().startOf("year"))
      ),
    [activities]
  )

  const statsPrev = useMemo(
    () =>
      getActivityStats(
        activities.filter(
          (a) =>
            dayjs(a.startDate) >= dayjs().startOf("year").subtract(1, "year") &&
            dayjs(a.startDate) < dayjs().subtract(1, "year")
        )
      ),
    [activities]
  )

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

import useActivities from "@/hooks/useActivities"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import DistanceStepChartContainer from "../DistanceStepChartContainer"
import Loading from "@/components/Loading"
import Stat from "../Stat"
import {
  getActivityStats,
  TrendBadge,
} from "../ActivitiesOverview/ActivitiesOverview"
import { minutesToHoursAndMinutes } from "@/lib/time"

const MonthlyOverview: React.FC = () => {
  const { activities, isLoading, isError } = useActivities(
    dayjs()
      .endOf("month")
      .subtract(dayjs().endOf("month").date() * 2, "days")
      .toDate()
  )

  const stats = useMemo(
    () =>
      activities &&
      getActivityStats(
        activities.filter((a) => dayjs(a.startDate) >= dayjs().startOf("month"))
      ),
    [activities]
  )

  const statsPrev = useMemo(
    () =>
      activities &&
      getActivityStats(
        activities.filter((a) => dayjs(a.startDate) < dayjs().startOf("month"))
      ),
    [activities]
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !activities) {
    return <div>failed to load</div>
  }

  const { hours, minutes } = minutesToHoursAndMinutes(stats?.totalTime)

  return (
    <div className="grid grid-cols-3 items-stretch gap-4">
      <DistanceStepChartContainer activities={activities} />
      <div className="col-span-2 grid grid-cols-2 items-start gap-4">
        <Stat>
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
        <Stat>
          <Stat.Title>Total Elapsed Time</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between ">
              <div>
                {hours}h {minutes.toFixed(0)}min
              </div>
              <TrendBadge
                current={stats?.totalTime}
                previous={statsPrev?.totalTime}
                unit={"min"}
              />
            </div>
          </Stat.Value>
        </Stat>
        <Stat>
          <Stat.Title>Total Elevation Gain</Stat.Title>
          <Stat.Value>
            <div className="flex items-end justify-between ">
              <div>{stats?.totalElevation?.toFixed(0)}km</div>
              <TrendBadge
                current={stats?.totalElevation}
                previous={statsPrev?.totalElevation}
                unit={"m"}
              />
            </div>
          </Stat.Value>
        </Stat>
      </div>
    </div>
  )
}

export default MonthlyOverview

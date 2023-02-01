import dayjs from "dayjs"
import React, { useMemo } from "react"
import DistanceStepChartContainer from "../DistanceStepChartContainer"
import Stat from "../Stat"
import {
  getActivityStats,
  TrendBadge,
} from "../Activities7DayStats/Activities7DayStats"
import { minutesToHoursAndMinutes } from "@/lib/time"
import { useDashboard } from "@/contexts/dashboard-context"
import Card from "../Card"

const MonthlyOverview: React.FC = () => {
  const { activities } = useDashboard()

  const thisMonthsActivities = useMemo(
    () =>
      activities.filter((a) => dayjs(a.startDate) >= dayjs().startOf("month")),
    [activities]
  )

  const stats = useMemo(
    () => getActivityStats(thisMonthsActivities),
    [thisMonthsActivities]
  )

  const statsPrev = useMemo(
    () =>
      getActivityStats(
        activities.filter(
          (a) =>
            dayjs(a.startDate) >=
              dayjs().startOf("month").subtract(1, "month") &&
            dayjs(a.startDate) < dayjs().startOf("month")
        )
      ),
    [activities]
  )

  const { hours, minutes } = minutesToHoursAndMinutes(stats?.totalTime)

  if (thisMonthsActivities.length === 0)
    return (
      <Card className="justify-center py-12 text-center text-sm font-medium">
        No activities recorded for this month yet.
      </Card>
    )

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
    </div>
  )
}

export default MonthlyOverview

import dayjs from "dayjs"
import React, { useMemo } from "react"
import DistanceStepChartContainer from "../DistanceStepChartContainer"
import { getActivityStats } from "../Activities7DayStats/Activities7DayStats"
import { useDashboard } from "@/contexts/dashboard-context"
import Card from "@/components/Card"
import StatCard from "@/components/ui/StatCard"

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
        <StatCard
          title={"Total Distance"}
          value={stats.totalDistance}
          previousValue={statsPrev.totalDistance}
          unit={"km"}
        />
        <StatCard
          title={"Total Time"}
          value={stats.totalTime}
          previousValue={statsPrev.totalTime}
          unit={"min"}
          precision={0}
        />
        <StatCard
          title={"Total Elevation Gain"}
          value={stats.totalElevation}
          previousValue={statsPrev.totalElevation}
          unit={"m"}
        />
      </div>
    </div>
  )
}

export default MonthlyOverview

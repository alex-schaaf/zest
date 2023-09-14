import dayjs from "dayjs"
import React, { useMemo } from "react"
import DistanceStepChartContainer from "@/components/DistanceStepChartContainer"
import { getActivityStats } from "@/components/SevenDayOverview/SevenDayOverview"
import { useDashboard } from "@/contexts/dashboard-context"
import Card from "@/components/ui/Card"
import StatCard from "@/components/ui/StatCard"

const MonthlyOverview: React.FC = () => {
  const { activities } = useDashboard()

  const thisMonthsActivities = useMemo(
    () =>
      activities.filter((a) => dayjs(a.startDate) >= dayjs().startOf("month")),
    [activities],
  )

  const stats = useMemo(
    () => getActivityStats(thisMonthsActivities),
    [thisMonthsActivities],
  )

  const lastMonthsActivites = useMemo(
    () =>
      activities.filter(
        (a) =>
          dayjs(a.startDate) >= dayjs().startOf("month").subtract(1, "month") &&
          dayjs(a.startDate) < dayjs().subtract(1, "month"),
      ),
    [activities],
  )

  const statsPrev = useMemo(
    () => getActivityStats(lastMonthsActivites),
    [lastMonthsActivites],
  )

  if (thisMonthsActivities.length === 0 && lastMonthsActivites.length === 0)
    return (
      <Card className="justify-center py-12 text-center text-sm font-medium">
        No activities recorded for this month yet.
      </Card>
    )

  return (
    <div className="grid gap-4 sm:grid-cols-2 items-start">
      <DistanceStepChartContainer activities={activities} />
      <div className="grid gap-4 lg:grid-cols-2">
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

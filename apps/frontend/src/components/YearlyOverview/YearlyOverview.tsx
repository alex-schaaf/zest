import { useMemo } from "react"
import dayjs from "dayjs"
import StatCard from "@/components/ui/StatCard"
import ActivitiesBarChartContainer from "@/components/ActivitiesBarChartContainer"
import { getActivityStats } from "@/components/SevenDayOverview/SevenDayOverview"
import { useDashboard } from "@/contexts/dashboard-context"

const YearlyOverview = () => {
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

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
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
      <ActivitiesBarChartContainer />
    </div>
  )
}

export default YearlyOverview

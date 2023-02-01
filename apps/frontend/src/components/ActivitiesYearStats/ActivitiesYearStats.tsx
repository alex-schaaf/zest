import { getActivityStats } from "@/components/Activities7DayStats/Activities7DayStats"
import React, { useMemo } from "react"
import { useDashboard } from "@/contexts/dashboard-context"
import dayjs from "dayjs"
import StatCard from "../ui/StatCard"

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

  return (
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
  )
}

export default ActivitiesYearStats

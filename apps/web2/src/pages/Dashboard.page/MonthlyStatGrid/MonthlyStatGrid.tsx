import React, { useMemo } from "react"
import classes from "./MonthlyStatGrid.module.css"
import { Activity } from "@/types/activity.types"
import { calcActivityStats } from "@/lib/stats"
import { SimpleGrid } from "@mantine/core"
import StatCard from "@/components/StatCard"

interface MonthlyStatGridProps {
  activities: Activity[]
  previousActivities: Activity[]
}

const MonthlyStatGrid: React.FC<MonthlyStatGridProps> = ({
  activities,
  previousActivities,
}) => {
  const stats = useMemo(() => calcActivityStats(activities), [activities])
  const statsPrevious = useMemo(
    () => calcActivityStats(previousActivities),
    [previousActivities]
  )

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
      <StatCard
        title="Activities"
        value={activities.length.toString()}
        diff={stats.numberOfActivities - statsPrevious.numberOfActivities}
      />
      <StatCard
        title="Total distance"
        value={stats.totalDistance.toFixed(1)}
        diff={stats.totalDistance - statsPrevious.totalDistance}
        unit="km"
        diffPrecision={1}
      />
      <StatCard
        title="Total elevation"
        value={stats.totalElevation.toFixed(0)}
        diff={stats.totalElevation - statsPrevious.totalElevation}
        unit="m"
      />
    </SimpleGrid>
  )
}

export default MonthlyStatGrid

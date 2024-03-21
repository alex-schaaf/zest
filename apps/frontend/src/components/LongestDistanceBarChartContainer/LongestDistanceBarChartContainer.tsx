import useActivities from "@/hooks/useActivities"
import React from "react"
import useElementSize from "@/hooks/useElementSize"
import LongestDistanceBarChart from "../LongestDistanceBarChart"
import { Title } from "../ui/StatCard/StatCard"

const LongestDistanceBarChartContainer: React.FC = () => {
  const { activities } = useActivities({
    orderBy: "distance",
    order: "desc",
    take: 10,
  })

  console.log(activities?.length)

  const [ref, { width, height }] = useElementSize()

  if (!activities) return null

  return (
    <div className="flex flex-col gap-4">
      <Title>Longest Runs [km]</Title>
      <div ref={ref} className="h-64 w-full">
        <LongestDistanceBarChart
          activities={activities}
          height={height}
          width={width}
        />
      </div>
    </div>
  )
}

export default LongestDistanceBarChartContainer

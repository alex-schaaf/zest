import dayjs from "dayjs"

import useActivities from "@/hooks/useActivities"
import ActivityWeeklyLineChart from "./ActivityWeeklyLineChart"
import useElementSize from "@/hooks/useElementSize"
import Card from "../ui/Card"

const ActivityWeeklyLineChartContainer = () => {
  const [ref, { width, height }] = useElementSize()
  const start = dayjs().startOf("year")

  const { activities, isLoading, isError } = useActivities(
    start.toDate(),
    undefined,
    !!start
  )

  if (isLoading) return null
  if (isError || !activities) return null

  return (
    <Card>
      <div ref={ref} className="h-48">
        <ActivityWeeklyLineChart
          activities={activities}
          width={width}
          height={height}
        />
      </div>
    </Card>
  )
}

export default ActivityWeeklyLineChartContainer

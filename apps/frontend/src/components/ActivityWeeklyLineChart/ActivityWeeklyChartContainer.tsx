import dayjs from "dayjs"

import useActivities from "@/hooks/useActivities"
import useElementSize from "@/hooks/useElementSize"
import Card from "../ui/Card"
import ActivityWeeklyBarChart from "../ActivityWeeklyBarChart"

const ActivityWeeklyChartContainer = () => {
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
        <ActivityWeeklyBarChart
          activities={activities}
          width={width}
          height={height}
        />
      </div>
    </Card>
  )
}

export default ActivityWeeklyChartContainer

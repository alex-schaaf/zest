import useActivities from "@/hooks/useActivities"

import Card from "@/components/ui/Card"
import Loading from "@/components/ui/Spinner"
import { StravaActivities } from "@prisma/client"

import ActivitiesBarChart2 from "../ActivitiesBarChart2"
import useElementSize from "@/hooks/useElementSize"

const ActivitiesBarChartContainer: React.FC = () => {
  const [ref, { width, height }] = useElementSize()

  const start = new Date(new Date().getFullYear(), 0, 1)
  const { activities, isLoading, isError } = useActivities(
    start,
    undefined,
    !!start
  )

  if (isLoading) return <Loading />
  if (isError) return <div>fialed to fetch</div>

  return (
    <Card>
      <div ref={ref} className="h-48">
        <ActivitiesBarChart2
          activities={activities as StravaActivities[]}
          width={width}
          height={height}
        />
      </div>
    </Card>
  )
}

export default ActivitiesBarChartContainer

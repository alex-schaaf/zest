import useActivities from "@/hooks/useActivities"
import ActivitiesBarChart from "@/components/ActivitiesBarChart/ActivitiesBarChart"
import Card from "@/components/ui/Card"
import Loading from "@/components/ui/Spinner"
import { StravaActivities } from "@prisma/client"
import { ParentSize } from "@visx/responsive"

const ActivitiesBarChartContainer: React.FC = () => {
  const start = new Date(new Date().getFullYear(), 0, 1)
  const { activities, isLoading, isError } = useActivities(
    start,
    undefined,
    !!start
  )

  if (isLoading) return <Loading />
  if (isError) return <div>fialed to fetch</div>

  return (
    <Card className="h-64">
      <ParentSize>
        {(parent) => (
          <ActivitiesBarChart
            activities={activities as StravaActivities[]}
            width={parent.width}
            height={parent.height}
          />
        )}
      </ParentSize>
    </Card>
  )
}

export default ActivitiesBarChartContainer

import Card from "@/components/ui/Card"
import DistanceStepChart from "../DistanceStepChart/DistanceStepChart"
import { StravaActivities } from "@prisma/client"
import useElementSize from "@/hooks/useElementSize"

interface Props {
  activities: StravaActivities[]
}

const DistanceStepChartContainer: React.FC<Props> = ({ activities }) => {
  const [ref, { width, height }] = useElementSize()

  return (
    <Card>
      <div ref={ref} className="h-36">
        <DistanceStepChart
          activities={activities}
          width={width}
          height={height}
        />
      </div>
    </Card>
  )
}

export default DistanceStepChartContainer

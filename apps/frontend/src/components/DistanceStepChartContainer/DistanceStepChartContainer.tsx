import Card from "@/components/ui/Card"
import DistanceStepChart from "../DistanceStepChart/DistanceStepChart"
import { StravaActivities } from "@prisma/client"
import { ParentSize } from "@visx/responsive"

interface Props {
  activities: StravaActivities[]
}

const DistanceStepChartContainer: React.FC<Props> = ({ activities }) => {
  return (
    <Card>
      <ParentSize>
        {(parent) => (
          <DistanceStepChart
            activities={activities}
            width={parent.width}
            height={parent.height}
          />
        )}
      </ParentSize>
    </Card>
  )
}

export default DistanceStepChartContainer

import useActivities from "@/hooks/useActivities"
import ActivitiesBarChart from "@/components/ActivitiesBarChart/ActivitiesBarChart"
import Card from "@/components/Card"
import Loading from "@/components/Loading"
import { StravaActivities } from "@prisma/client"
import React, { useEffect, useRef, useState } from "react"
import { ParentSize } from "@visx/responsive"

const ActivitiesBarChartContainer: React.FC = () => {
  const ref = useRef<any>(null)

  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 })

  const start = new Date(new Date().getFullYear(), 0, 1)
  const { activities, isLoading, isError } = useActivities(
    start,
    undefined,
    !!start
  )

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }
  }, [activities])

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

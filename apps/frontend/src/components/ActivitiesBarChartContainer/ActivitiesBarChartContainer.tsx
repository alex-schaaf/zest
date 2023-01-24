import useActivities from "../../hooks/useActivities"
import ActivitiesBarChart from "../ActivitiesBarChart/ActivitiesBarChart"
import Card from "../Card"
import Loading from "../Loading"
import { StravaActivities } from "@prisma/client"
import React, { useEffect, useRef, useState } from "react"

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
    <Card>
      <div ref={ref} className="h-48">
        <ActivitiesBarChart
          activities={activities as StravaActivities[]}
          width={width}
          height={height}
        />
      </div>
    </Card>
  )
}

export default ActivitiesBarChartContainer

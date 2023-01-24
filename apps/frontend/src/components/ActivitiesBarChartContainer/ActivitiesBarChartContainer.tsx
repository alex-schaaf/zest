import { useUser } from "../../contexts/user-context"
import ActivitiesBarChart from "../ActivitiesBarChart/ActivitiesBarChart"
import Card from "../Card"
import Loading from "../Loading"
import { StravaActivities } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

const ActivitiesBarChartContainer: React.FC = () => {
  const ref = useRef<any>(null)

  const { user } = useUser()

  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 })

  const start = new Date(new Date().getFullYear(), 0, 1)

  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery<StravaActivities[], Error>({
    queryKey: ["activities"],
    enabled: !!start,
    queryFn: () =>
      axios
        .get(
          import.meta.env.VITE_API_URL +
            `/users/${user.id}/activities?start=${start.toISOString()}`
        )
        .then((res) => res.data),
  })

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
          activities={activities}
          width={width}
          height={height}
        />
      </div>
    </Card>
  )
}

export default ActivitiesBarChartContainer

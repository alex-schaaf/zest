import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { useUser } from "../../contexts/user-context"
import ActivitiesBarChart from "../ActivitiesBarChart/ActivitiesBarChart"
import { StravaActivities } from "@prisma/client"
import axios from "axios"
import Loading from "../Loading"

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
  }, [])

  if (isLoading) return <Loading />
  if (isError) return <div>fialed to fetch</div>

  return (
    <div ref={ref} className="h-96">
      <ActivitiesBarChart
        activities={activities}
        width={width}
        height={height}
      />
    </div>
  )
}

export default ActivitiesBarChartContainer

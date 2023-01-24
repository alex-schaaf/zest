import useActivities from "../../hooks/useActivities"
import ActivitiesOverview from "../ActivitiesOverview/ActivitiesOverview"
import Card from "../Card"
import Loading from "../Loading"
import { StravaActivities } from "@prisma/client"
import React, { useEffect, useState } from "react"

const ActivitiesOverviewContainer: React.FC = () => {
  const dayOffset = 7
  const [start, setStart] = useState<Date>()
  const [startPrevious, setStartPrevious] = useState<Date>()

  /** Set the relevant date ranges to query the most recent activities
   *  when component gets mounted */
  useEffect(() => {
    const now = new Date()
    const start = new Date(new Date().setDate(now.getDate() - dayOffset))
    setStart(start)
    const startPrevious = new Date(
      new Date().setDate(now.getDate() - 2 * dayOffset)
    )
    setStartPrevious(startPrevious)
  }, [])

  const { activities, isLoading, isError } = useActivities(
    startPrevious,
    undefined,
    !!start
  )

  if (isLoading || !start) {
    return <Loading />
  }

  if (isError) {
    return (
      <Card className="flex h-24 gap-4">
        <div className="border-r-4 border-red-400 px-4 text-4xl font-medium">
          error
        </div>
        <div className="">
          <div className="font-medium">failed to fetch</div>
          <div className="text-sm text-gray-500">
            Failed to fetch relevant data from the server.
          </div>
        </div>
      </Card>
    )
  }

  return (
    <ActivitiesOverview
      start={start}
      activities={activities as StravaActivities[]}
    />
  )
}

export default ActivitiesOverviewContainer

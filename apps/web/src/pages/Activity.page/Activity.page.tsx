import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import axios from "@/lib/axios"
import { useUserContext } from "@/contexts/user-context"
import { Paper } from "@mantine/core"
import { Activity } from "@/types/activity.types"

const ActivityPage = () => {
  const { user } = useUserContext()
  const { activityId } = useParams()

  const {
    isLoading,
    isError,
    data: activity,
    error,
  } = useQuery<Activity>({
    queryKey: ["activity", { activityId }],
    queryFn: () =>
      axios
        .get(`/users/${user.id}/activities/${activityId}`)
        .then((res) => res.data),
  })

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError || activity === undefined) {
    return <>Error</>
  }

  return (
    <Paper withBorder p="md">
      <pre>{JSON.stringify(activity, null, 2)}</pre>
    </Paper>
  )
}

export default ActivityPage

import { Activity } from "@/types/activity.types"
import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { useUserContext } from "@/contexts/user-context"

interface ActivitiesQueryParams {
  skip?: number
  take?: number
  startDateGte?: Date
  startDateLte?: Date
  orderBy?: keyof Activity
  order?: "desc" | "asc"
}

const useActivities = (
  queryParams?: ActivitiesQueryParams,
  enabled?: boolean
) => {
  const { user } = useUserContext()

  const urlParams = new URLSearchParams()

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (["startDateLte", "startDateGte"].includes(key)) {
        urlParams.append(key, value.toISOString())
      } else if (typeof value === "number") {
        urlParams.append(key, value.toString())
      } else {
        urlParams.append(key, value)
      }
    }
  }

  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery<Activity[], Error>({
    queryKey: ["activities", urlParams.toString()],
    enabled,
    queryFn: () =>
      axios
        .get(`/users/${user.id}/activities?` + urlParams.toString())
        .then((res) => res.data),
  })

  return { activities, isLoading, isError }
}

export default useActivities

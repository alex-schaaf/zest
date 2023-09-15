import { useUser } from "@/contexts/user-context"
import { StravaActivities } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"

interface ActivitiesQueryParams {
  skip?: number
  take?: number
  startDateGte?: Date
  startDateLte?: Date
  orderBy?: keyof StravaActivities
  order?: "desc" | "asc"
}

const useActivities = (
  queryParams?: ActivitiesQueryParams,
  enabled?: boolean,
) => {
  const { user } = useUser()

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
  } = useQuery<StravaActivities[], Error>({
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

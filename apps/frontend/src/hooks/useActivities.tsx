import { useUser } from "@/contexts/user-context"
import { StravaActivities } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"

const useActivities = (
  start: Date | undefined = undefined,
  end?: Date,
  enabled?: boolean
) => {
  const { user } = useUser()

  const urlParams = new URLSearchParams()

  if (start) {
    urlParams.append("start", start?.toISOString())
  }

  if (end) {
    urlParams.append("end", end?.toISOString())
  }

  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery<StravaActivities[], Error>({
    queryKey: ["activities", start, end],
    enabled,
    queryFn: () =>
      axios
        .get(`/users/${user.id}/activities?` + urlParams.toString())
        .then((res) => res.data),
  })

  return { activities, isLoading, isError }
}

export default useActivities

import { useUserContext } from "@/contexts/user-context"
import { Settings } from "@/types/user.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import axios from "@/lib/axios"
import { SummaryActivity } from "@/types/strava.types"
import { notifications } from "@mantine/notifications"

interface UseStrava {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean | null
  syncActivities: (
    searchParams?: StravaAPIActivitiesSearchParams
  ) => Promise<void>
}

const stravaUrl = "https://www.strava.com/api/v3"

const useStrava = (): UseStrava => {
  const { user } = useUserContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const queryClient = useQueryClient()

  const userMutation = useMutation({
    mutationFn: (values: { settings: Partial<Settings> }) =>
      axios.patch(`/users/${user.id}`, values),
  })

  const activitiesMutation = useMutation({
    mutationFn: (activities: SummaryActivity[]) =>
      axios.post(`/users/${user.id}/activities`, activities),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] })
    },
  })

  const getRefreshedAccessToken = async (
    params: StravaRefreshParams
  ): Promise<StravaRefreshResponse> => {
    return await axios
      .post(
        stravaUrl +
          "/oauth/token?" +
          new URLSearchParams({
            client_id: params.stravaClientId,
            client_secret: params.stravaClientSecret,
            grant_type: "refresh_token",
            refresh_token: params.stravaRefreshToken,
          }),
        {},
        { withCredentials: false }
      )
      .then((res) => ({
        stravaAccessToken: res.data.access_token,
        stravaRefreshToken: res.data.refresh_token,
        stravaTokenExpiresAt: res.data.expires_at,
      }))
  }

  const syncActivities = async (
    searchParams?: StravaAPIActivitiesSearchParams
  ) => {
    if (
      !user.settings.stravaClientId ||
      !user.settings.stravaClientSecret ||
      !user.settings.stravaRefreshToken ||
      !user.settings.stravaTokenExpiresAt ||
      !user.settings.stravaAccessToken
    )
      return

    try {
      setIsLoading(true)
      setIsError(false)
      setIsSuccess(null)

      if (isTokenExpired(user.settings.stravaTokenExpiresAt)) {
        const refreshedResponse = await getRefreshedAccessToken({
          stravaClientId: user.settings.stravaClientId,
          stravaClientSecret: user.settings.stravaClientSecret,
          stravaRefreshToken: user.settings.stravaRefreshToken,
        })

        userMutation.mutate({
          settings: {
            stravaAccessToken: refreshedResponse.stravaAccessToken,
            stravaRefreshToken: refreshedResponse.stravaRefreshToken,
            stravaTokenExpiresAt: refreshedResponse.stravaTokenExpiresAt,
          },
        })
      }

      const activities = await getStravaActivities(
        user.settings.stravaAccessToken,
        searchParams
      )

      await activitiesMutation.mutate(
        activities.filter((a) => a.type === "Run")
      )

      setIsSuccess(true)

      notifications.show({
        title: "Success!",
        message: "Your activities were synced.",
        color: "green",
      })
    } catch {
      setIsError(true)
      setIsSuccess(false)
      notifications.show({
        title: "Error!",
        message: "There was an error syncing your activities.",
        color: "red",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isError, isSuccess, syncActivities }
}

export default useStrava

type StravaRefreshParams = Required<
  Pick<Settings, "stravaClientId" | "stravaClientSecret" | "stravaRefreshToken">
>

type StravaRefreshResponse = Pick<
  Settings,
  "stravaAccessToken" | "stravaRefreshToken" | "stravaTokenExpiresAt"
>

const isTokenExpired = (expiresAt: number): boolean => {
  return expiresAt <= new Date().getTime() / 1000
}

export interface StravaAPIActivitiesSearchParams {
  before?: number
  after?: number
  page?: number
  per_page?: number
}

export const getStravaActivities = async (
  access_token: string,
  stravaSearchParams: StravaAPIActivitiesSearchParams = {}
): Promise<SummaryActivity[]> => {
  const searchParams = new URLSearchParams({
    access_token,
    ...JSON.parse(JSON.stringify(stravaSearchParams)),
  })

  return await axios
    .get(stravaUrl + "/athlete/activities?" + searchParams.toString(), {
      withCredentials: false,
    })
    .then((res) => res.data)
}

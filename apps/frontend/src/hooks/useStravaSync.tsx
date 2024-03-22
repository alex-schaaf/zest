import { Settings } from "@prisma/client"
import axios from "axios"
import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import {
  getStravaActivities,
  refreshStravaAccessToken,
  StravaAPIActivitiesSearchParams,
} from "@/lib/strava.service"
import { useQueryClient } from "@tanstack/react-query"
import { SummaryActivity } from "@/strava-types/src"

const useStravaSync = (): {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean | null
  canSync: boolean
  sync: (searchParams?: StravaAPIActivitiesSearchParams) => Promise<void>
} => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const queryClient = useQueryClient()

  const canSync = getCanSync(user.settings)

  const sync = async (searchParams: StravaAPIActivitiesSearchParams = {}) => {
    if (
      !user ||
      !user.settings.stravaTokenExpiresAt ||
      !user.settings.stravaAccessToken
    )
      return

    try {
      setIsLoading(true)
      setIsError(false)
      setIsSuccess(null)

      if (tokenExpired(user.settings.stravaTokenExpiresAt)) {
        const refreshedTokens = await refreshStravaAccessToken(user.settings)
        const updatedUserSettings = { ...user.settings, ...refreshedTokens }
        user.settings.stravaRefreshToken =
          updatedUserSettings.stravaRefreshToken
        user.settings.stravaAccessToken = updatedUserSettings.stravaAccessToken
        user.settings.stravaTokenExpiresAt =
          updatedUserSettings.stravaTokenExpiresAt

        await patchUserSettings(user.id, user.settings)
      }

      if (!user.settings.stravaAccessToken) return

      const activities = await getStravaActivities(
        user.settings.stravaAccessToken,
        searchParams
      )

      await postActivities(
        user.id,
        activities.filter((a) => a.type === "Run")
      )

      setIsSuccess(true)
      queryClient.invalidateQueries({ queryKey: ["activities"] })
    } catch (err) {
      setIsError(true)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isError,
    isSuccess,
    canSync,
    sync,
  }
}

export default useStravaSync

const getCanSync = (settings: Settings): boolean => {
  if (
    !settings.stravaClientId ||
    !settings.stravaClientSecret ||
    !settings.stravaRefreshToken ||
    !settings.stravaTokenExpiresAt
  )
    return false
  return true
}

const tokenExpired = (expiresAt: number): boolean => {
  return expiresAt <= new Date().getTime() / 1000
}

const postActivities = async (
  userId: number,
  activities: SummaryActivity[]
) => {
  await axios.post(
    import.meta.env.VITE_API_URL + `/users/${userId}/activities`,
    activities,
    { withCredentials: true }
  )
}

const patchUserSettings = async (userId: number, settings: Settings) => {
  await axios.patch(
    import.meta.env.VITE_API_URL + `/users/${userId}`,
    {
      settings: {
        stravaAccessToken: settings.stravaAccessToken,
        stravaRefreshToken: settings.stravaRefreshToken,
        stravaTokenExpiresAt: settings.stravaTokenExpiresAt,
      },
    },
    { withCredentials: true }
  )
}

import { Settings } from "@prisma/client"
import axios from "axios"
import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { UserWithSettings } from "@/contexts/auth-context"
import {
  getStravaActivities,
  refreshStravaAccessToken,
  StravaAPIActivitiesSearchParams,
} from "@/lib/strava.service"
import { useQueryClient } from "@tanstack/react-query"

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
        user.settings = { ...user.settings, ...refreshedTokens }
        await patchUserSettings(user)
      }

      if (!user.settings.stravaAccessToken) return

      const activities = await getStravaActivities(
        user.settings.stravaAccessToken,
        searchParams
      )
      await postActivities(user.id, activities)

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

const postActivities = async (userId: number, activities: []) => {
  await axios.post(
    import.meta.env.VITE_API_URL + `/users/${userId}/activities`,
    activities,
    { withCredentials: true }
  )
}

const patchUserSettings = async (user: UserWithSettings) => {
  await axios.patch(
    import.meta.env.VITE_API_URL +
      `/users/${user.id}/settings/${user.settingsId}`,
    {
      stravaAccessToken: user.settings.stravaAccessToken,
      stravaRefreshToken: user.settings.stravaRefreshToken,
      stravaTokenExpiresAt: user.settings.stravaTokenExpiresAt,
    },
    { withCredentials: true }
  )
}

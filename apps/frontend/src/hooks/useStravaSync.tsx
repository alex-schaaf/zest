import { Settings } from "@prisma/client"
import axios from "axios"
import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { UserWithSettings } from "@/contexts/auth-context"

const stravaUrl = "https://www.strava.com/api/v3"

interface StravaAPIActivitiesSearchParams {
  before?: number
  after?: number
  page?: number
  per_page?: number
}

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

  const canSync = getCanSync(user.settings)

  const sync = async (searchParams: StravaAPIActivitiesSearchParams = {}) => {
    console.log("Strava sync started")
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
        const refreshedTokens = await refreshToken(user.settings)
        user.settings = { ...user.settings, ...refreshedTokens }
        await patchUserSettings(user.settings)
      }

      const activities = await fetchAthleteActivities(
        user.settings.stravaAccessToken,
        searchParams
      )
      await postActivities(user.id, activities)

      setIsSuccess(true)
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

const refreshToken = async (
  settings: Settings
): Promise<{
  stravaAccessToken: string
  stravaRefreshToken: string
  stravaTokenExpiresAt: number
}> => {
  const refreshResponse = await axios
    .get(
      `${stravaUrl}/oauth/token?` +
        new URLSearchParams({
          client_id: settings.stravaClientId.toString(),
          client_secret: settings.stravaClientSecret,
          grant_type: "refresh_token",
          refresh_token: settings.stravaRefreshToken,
        })
    )
    .then((res) => res.data)

  return {
    stravaAccessToken: refreshResponse.access_token,
    stravaRefreshToken: refreshResponse.refresh_token,
    stravaTokenExpiresAt: parseInt(refreshResponse.expires_at),
  }
}

const tokenExpired = (expiresAt: number): boolean => {
  return expiresAt <= new Date().getTime() / 1000
}

const fetchAthleteActivities = async (
  access_token: string,
  stravaSearchParams: StravaAPIActivitiesSearchParams = {}
) => {
  const searchParams = new URLSearchParams({
    access_token,
    ...JSON.parse(JSON.stringify(stravaSearchParams)),
  })

  const activities = await axios
    .get(stravaUrl + "/athlete/activities?" + searchParams.toString())
    .then((res) => res.data)

  return activities
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

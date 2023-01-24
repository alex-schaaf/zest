import { useUser } from "../contexts/user-context"
import { Settings } from "@prisma/client"
import axios from "axios"
import { useState } from "react"

const stravaUrl = "https://www.strava.com/api/v3"

const useStravaSync = (): {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean | null
  canSync: boolean
  sync: () => Promise<void>
} => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const canSync = getCanSync(user.settings)

  const sync = async () => {
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
        user.settings.stravaAccessToken
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

const fetchAthleteActivities = async (access_token: string) => {
  const activities = await axios
    .get(
      stravaUrl + "/athlete/activities?" + new URLSearchParams({ access_token }) // page: "8", per_page: "30"
    )
    .then((res) => res.data)

  return activities
}

const postActivities = async (userId: number, activities: []) => {
  await axios.post(
    import.meta.env.VITE_API_URL + `/users/${userId}/activities`,
    activities
  )
}

const patchUserSettings = async (settings: Settings) => {
  await axios.patch(import.meta.env.VITE_API_URL + `/settings/${settings.id}`, {
    stravaAccessToken: settings.stravaAccessToken,
    stravaRefreshToken: settings.stravaRefreshToken,
    stravaTokenExpiresAt: settings.stravaTokenExpiresAt,
  })
}

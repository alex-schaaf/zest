import React from "react"
import axios from "axios"
import { Settings } from "@prisma/client"
import { useUser } from "../../contexts/user-context"

const stravaUrl = "https://www.strava.com/api/v3"
const apiUrl = "http://localhost:3000"

const StravaSyncBtn: React.FC = () => {
  const { user } = useUser()

  if (!user) return null

  const canSync = getCanSync(user.settings)

  const handleClick = async () => {
    if (
      !user ||
      !user.settings.stravaClientId ||
      !user.settings.stravaClientSecret ||
      !user.settings.stravaRefreshToken ||
      !user.settings.stravaAccessToken ||
      !user.settings.stravaTokenExpiresAt
    )
      return

    let refreshed = false
    if (tokenExpired(user.settings.stravaTokenExpiresAt)) {
      const refresh = await refreshToken(user.settings)
      user.settings = { ...user.settings, ...refresh }
      refreshed = true
    }

    const activities = await fetchAthleteActivities(
      user.settings.stravaAccessToken
    )

    await postActivities(user.id, activities)

    if (refreshed) {
      await patchUserSettings(user.settings)
    }
  }

  return (
    <button
      disabled={canSync}
      className="rounded-md bg-orange-500 px-2 py-1 text-white"
      onClick={handleClick}
    >
      Sync Strava
    </button>
  )
}

export default StravaSyncBtn

const getCanSync = (settings: Settings): boolean => {
  if (
    settings.stravaClientId ||
    settings.stravaClientSecret ||
    settings.stravaRefreshToken ||
    settings.stravaTokenExpiresAt
  )
    return false
  return true
}

const refreshToken = async (settings: Settings) => {
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
    stravaAccessToken: refreshResponse.access_toke,
    stravaRefreshToken: refreshResponse.refresh_toke,
    stravaTokenExpiresAt: refreshResponse.expires_at,
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
  await axios.post(apiUrl + `/users/${userId}/activities`, activities)
}

const patchUserSettings = async (settings: Settings) => {
  await axios.patch(apiUrl + `/settings/${settings.id}`, {
    stravaAccessToken: settings.stravaAccessToken,
    stravaRefreshToken: settings.stravaRefreshToken,
    stravaTokenExpiresAt: settings.stravaTokenExpiresAt,
  })
}

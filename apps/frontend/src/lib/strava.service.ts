import axios from "axios"
import { Settings } from "@prisma/client"
import { SummaryActivity } from "strava-types"

const stravaUrl = "https://www.strava.com/api/v3"

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

  const activities = await axios
    .get(stravaUrl + "/athlete/activities?" + searchParams.toString())
    .then((res) => res.data)

  return activities
}

type StravaRefreshParams = Pick<
  Settings,
  "stravaClientId" | "stravaClientSecret" | "stravaRefreshToken"
>

type StravaRefreshResponse = Pick<
  Settings,
  "stravaAccessToken" | "stravaRefreshToken" | "stravaTokenExpiresAt"
>

export const refreshStravaAccessToken = async (
  params: StravaRefreshParams
): Promise<StravaRefreshResponse> => {
  if (
    !params.stravaClientId ||
    !params.stravaClientSecret ||
    !params.stravaRefreshToken
  ) {
    return Promise.reject("Missing required strava API params")
  }

  const refreshResponse = await axios
    .post(
      `${stravaUrl}/oauth/token?` +
        new URLSearchParams({
          client_id: params.stravaClientId?.toString(),
          client_secret: params.stravaClientSecret,
          grant_type: "refresh_token",
          refresh_token: params.stravaRefreshToken,
        })
    )
    .then((res) => res.data)

  return {
    stravaAccessToken: refreshResponse.access_token,
    stravaRefreshToken: refreshResponse.refresh_token,
    stravaTokenExpiresAt: parseInt(refreshResponse.expires_at),
  }
}

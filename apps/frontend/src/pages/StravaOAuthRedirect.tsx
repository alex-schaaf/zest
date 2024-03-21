import { useUser } from "@/contexts/user-context"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface StravaTokenResponse {
  token_type: "Bearer"
  expires_at: number
  expires_in: number
  refresh_token: string
  access_token: string
  athlete: any
}

function getCodeParam() {
  const { search } = window.location
  const searchPrams = new URLSearchParams(search)
  const code = searchPrams.get("code")

  return code
}

const StravaOAuthRedirect = () => {
  const navigate = useNavigate()
  const [authResponse, setAuthResponse] = useState<StravaTokenResponse>()

  const { user } = useUser()

  useEffect(() => {
    if (!user.settings) return

    const code = getCodeParam()

    if (!code) return

    const getStravaAuthTokens = async () => {
      const data = await axios
        .post("https://www.strava.com/api/v3/oauth/token", {
          client_id: user.settings.stravaClientId,
          client_secret: user.settings.stravaClientSecret,
          code,
          grant_type: "authorization_code",
        })
        .then((res) => res.data)
      setAuthResponse(data)
    }

    getStravaAuthTokens()
  }, [user.settings])

  useEffect(() => {
    if (!authResponse || !user) return
    const { expires_at, access_token, refresh_token } = authResponse

    const storeStravaAuthTokens = async () => {
      axios
        .patch(
          import.meta.env.VITE_API_URL +
            `/users/${user.id}/settings/${user.settingsId}`,
          {
            stravaTokenExpiresAt: expires_at,
            stravaAccessToken: access_token,
            stravaRefreshToken: refresh_token,
          },
          { withCredentials: true }
        )
        .then(() => {
          navigate("/settings")
        })
    }

    storeStravaAuthTokens()
  }, [authResponse])

  return <div>Authenticating...</div>
}

export default StravaOAuthRedirect

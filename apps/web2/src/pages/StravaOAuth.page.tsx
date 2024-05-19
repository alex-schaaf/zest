import { LoadingOverlay } from "@mantine/core"
import axios from "@/lib/axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useUserContext } from "@/contexts/user-context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"

interface StravaTokenResponse {
  token_type: "Bearer"
  expires_at: number
  expires_in: number
  refresh_token: string
  access_token: string
  athlete: any
}

const StravaOAuthPage: React.FC = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const [authResponse, setAuthResponse] = useState<StravaTokenResponse>()

  const mutation = useMutation({
    mutationFn: (values: StravaTokenResponse) =>
      axios.patch(`/users/${user.id}`, {
        settings: {
          stravaTokenExpiresAt: values.expires_at,
          stravaAccessToken: values.access_token,
          stravaRefreshToken: values.refresh_token,
        },
      }),
    onError: (error) => {
      console.error(error)
      notifications.show({
        title: "Failure!",
        message: error.message,
        color: "red",
      })
    },
    onSuccess: () => {
      notifications.show({
        title: "Success!",
        message: "Strava account authorized.",
        color: "green",
      })
      queryClient.invalidateQueries({ queryKey: ["user"] })
      navigate("/settings")
    },
  })

  const getStravaAuthTokens = async () => {
    const code = searchParams.get("code")
    if (!code) return
    const data = await axios
      .post(
        "https://www.strava.com/oauth/token",
        {
          client_id: user.settings.stravaClientId,
          client_secret: user.settings.stravaClientSecret,
          code,
          grant_type: "authorization_code",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      )
      .then((res) => res.data)
    setAuthResponse(data)
  }

  useEffect(() => {
    getStravaAuthTokens()
  }, [])

  useEffect(() => {
    if (!authResponse) return
    mutation.mutate(authResponse)
  }, [authResponse])

  return <LoadingOverlay visible zIndex={1000} overlayProps={{ blur: 0 }} />
}

export default StravaOAuthPage

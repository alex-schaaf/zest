import { PropsWithChildren } from "react"
import Button from "@/components/ui/Button"

const StravaAuthBtn: React.FC<PropsWithChildren> = (props) => {
  const urlParams = new URLSearchParams({
    client_id: "47083",
    redirect_uri: "http://localhost:5173/auth/strava",
    response_type: "code",
    scope: "activity:read_all",
  }).toString()
  const stravaUrl = new URL("https://www.strava.com/oauth/authorize")
  stravaUrl.search = urlParams

  return (
    <a href={stravaUrl.toString()} className="flex">
      <Button>{props.children}</Button>
    </a>
  )
}

export default StravaAuthBtn

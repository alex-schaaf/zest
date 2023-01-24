const StravaAuthBtn = () => {
  const urlParams = new URLSearchParams({
    client_id: "47083",
    redirect_uri: "http://localhost:5173/auth/strava",
    response_type: "code",
    scope: "activity:read_all",
  }).toString()
  const stravaUrl = new URL("https://www.strava.com/oauth/authorize")
  stravaUrl.search = urlParams

  return (
    <button className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-400">
      <a href={stravaUrl.toString()}>Authorize Strava</a>
    </button>
  )
}

export default StravaAuthBtn

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Users, Settings } from "@prisma/client";
import fetcher from "../lib/fetcher";
import { useLocation } from "wouter";

type UserWithSettings = Users & { settings: Settings };

interface StravaTokenResponse {
  token_type: "Bearer";
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: any;
}

function getCodeParam() {
  const { pathname, search } = window.location;
  const searchPrams = new URLSearchParams(search);
  const code = searchPrams.get("code");

  return code;
}

const StravaOAuthRedirect = () => {
  const [, setLocation] = useLocation();
  const [authResponse, setAuthResponse] = useState<StravaTokenResponse>();

  const {
    isLoading,
    data: user,
    error,
  } = useSWR<UserWithSettings, Error>("http://localhost:3000/users/1", fetcher);

  useEffect(() => {
    if (!user) return;

    const code = getCodeParam();

    if (!code) return;

    console.log("user.settingsStravaClientId", user.settings.stravaClientId);

    const getStravaAuthTokens = async () => {
      const response = await fetch(
        "https://www.strava.com/api/v3/oauth/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            client_id: user.settings.stravaClientId,
            client_secret: user.settings.stravaClientSecret,
            code,
            grant_type: "authorization_code",
          }),
        }
      );
      const data = await response.json();
      setAuthResponse(data);
    };

    getStravaAuthTokens();
  }, [user]);

  useEffect(() => {
    if (!authResponse || !user) return;
    const { expires_at, access_token, refresh_token } = authResponse;

    const storeStravaAuthTokens = async () => {
      fetch(`http://localhost:3000/settings/${user.settingsId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stravaTokenExpiresAt: expires_at,
          stravaAccessToken: access_token,
          stravaRefreshToken: refresh_token,
        }),
      }).then(() => {
        setLocation("settings");
      });
    };

    storeStravaAuthTokens();
  }, [authResponse]);

  return <div>Authenticating...</div>;
};

export default StravaOAuthRedirect;

// http://localhost:5173/settings?state=&code=2973tyiuegwhk&scope=read,read_all

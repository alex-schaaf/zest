import React from "react";
import useSWR from "swr";
import { Users, Settings } from "@prisma/client";

const stravaUrl = "https://www.strava.com/api/v3";
const apiUrl = "http://localhost:3000";

const StravaSyncBtn: React.FC = () => {
  const { isLoading, data: user } = useSWR<
    Users & { settings: Settings },
    Error
  >(apiUrl + "/users/1");

  const handleClick = async () => {
    if (!user) return;

    let refreshed = false;

    if (user.settings.stravaTokenExpiresAt <= new Date().getTime() / 1000) {
      const refreshResponse = await fetch(
        `${stravaUrl}/oauth/token?` +
          new URLSearchParams({
            client_id: user.settings.stravaClientId,
            client_secret: user?.settings.stravaClientSecret,
            grant_type: "refresh_token",
            refresh_token: user?.settings.stravaRefreshToken,
          })
      ).then((res) => res.json());

      user.settings.stravaAccessToken = refreshResponse.access_token;
      user.settings.stravaRefreshToken = refreshResponse.refresh_token;
      user.settings.stravaTokenExpiresAt = refreshResponse.expires_at;

      refreshed = true;
    }

    let response = await fetch(
      `${stravaUrl}/athlete/activities?` +
        new URLSearchParams({
          access_token: user?.settings.stravaAccessToken as unknown as string,
        })
    );
    if (response.status >= 300) {
      console.error(response);
      return;
    }

    const activities = await response.json();
    console.log(`Fetched ${activities?.length} activities`);

    console.log("Saving activities to database");
    await fetch(apiUrl + "/users/1/activities", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activities),
    })
      .then((res) => res.json())
      .catch(console.error);

    if (refreshed) {
      await fetch(apiUrl + `/settings/${user.settingsId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stravaAccessToken: user.settings.stravaAccessToken,
          stravaRefreshToken: user.settings.stravaRefreshToken,
          stravaTokenExpiresAt: user.settings.stravaTokenExpiresAt,
        }),
      });
    }
  };

  return (
    <div className="">
      <button
        className="bg-orange-500 text-white px-2 py-1 rounded-md"
        onClick={handleClick}
      >
        Sync Strava
      </button>
    </div>
  );
};

export default StravaSyncBtn;

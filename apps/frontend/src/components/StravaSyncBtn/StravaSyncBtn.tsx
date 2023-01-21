import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext/UserContext";

const stravaUrl = "https://www.strava.com/api/v3";
const apiUrl = "http://localhost:3000";
import { Settings } from "@prisma/client";

const getCanSync = (settings: Settings): boolean => {
  if (
    settings.stravaClientId ||
    settings.stravaClientSecret ||
    settings.stravaRefreshToken ||
    settings.stravaTokenExpiresAt
  )
    return false;
  return true;
};

const refreshToken = async (settings: Settings) => {
  const refreshResponse = await fetch(
    `${stravaUrl}/oauth/token?` +
      new URLSearchParams({
        client_id: settings.stravaClientId.toString(),
        client_secret: settings.stravaClientSecret,
        grant_type: "refresh_token",
        refresh_token: settings.stravaRefreshToken,
      })
  ).then((res) => res.json());

  return {
    stravaAccessToken: refreshResponse.access_toke,
    stravaRefreshToken: refreshResponse.refresh_toke,
    stravaTokenExpiresAt: refreshResponse.expires_at,
  };
};

const tokenExpired = (expiresAt: number): boolean => {
  return expiresAt <= new Date().getTime() / 1000;
};

const fetchAthleteActivities = async (access_token: string) => {
  const activities = await fetch(
    stravaUrl + "/athlete/activities?" + new URLSearchParams({ access_token })
  )
    .then((res) => res.json())
    .catch(console.error);

  return activities;
};

const postActivities = async (userId: number, activities: []) => {
  await fetch(apiUrl + `/users/${userId}/activities`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activities),
  })
    .then((res) => res.json())
    .catch(console.error);
};

const patchUserSettings = async (settings: Settings) => {
  await fetch(apiUrl + `/settings/${settings.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stravaAccessToken: settings.stravaAccessToken,
      stravaRefreshToken: settings.stravaRefreshToken,
      stravaTokenExpiresAt: settings.stravaTokenExpiresAt,
    }),
  });
};

const StravaSyncBtn: React.FC = () => {
  const { user } = useContext(UserContext);
  const canSync = getCanSync(user.settings);

  const handleClick = async () => {
    if (
      !user ||
      !user.settings.stravaClientId ||
      !user.settings.stravaClientSecret ||
      !user.settings.stravaRefreshToken ||
      !user.settings.stravaAccessToken ||
      !user.settings.stravaTokenExpiresAt
    )
      return;

    let refreshed = false;
    if (tokenExpired(user.settings.stravaTokenExpiresAt)) {
      const refresh = await refreshToken(user.settings);
      user.settings = { ...user.settings, ...refresh };
      refreshed = true;
    }

    const activities = await fetchAthleteActivities(
      user.settings.stravaAccessToken
    );

    await postActivities(user.id, activities);

    if (refreshed) {
      await patchUserSettings(user.settings);
    }
  };

  return (
    <div>
      <button
        disabled={canSync}
        className="bg-orange-500 text-white px-2 py-1 rounded-md"
        onClick={handleClick}
      >
        Sync Strava
      </button>
    </div>
  );
};

export default StravaSyncBtn;

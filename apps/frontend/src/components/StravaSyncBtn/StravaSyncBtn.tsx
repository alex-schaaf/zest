import React from "react";
import useSWR from "swr";
import { Users, Settings } from "@prisma/client";

const StravaSyncBtn: React.FC = () => {
  const { isLoading, data: user } = useSWR<
    Users & { settings: Settings },
    Error
  >("http://localhost:3000/users/1");

  const handleClick = async () => {
    console.log("Fetching activities...");
    console.log(
      "user?.settings.stravaAccessToken",
      user?.settings.stravaAccessToken
    );
    let response = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?" +
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
    await fetch("http://localhost:3000/users/1/activities", {
      method: "POST",
      body: JSON.stringify(activities),
    })
      .then((res) => res.json())
      .catch(console.error);
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

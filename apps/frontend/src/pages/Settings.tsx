import useSWR from "swr";
import { Users } from "@prisma/client";
import StravaAuthBtn from "../components/StravaAuthBtn";
import fetcher from "../lib/fetcher";

const Settings = () => {
  const { isLoading, data, error } = useSWR<Users, Error>(
    "http://localhost:3000/users/1",
    fetcher
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div className="text-2xl font-medium">Strava</div>
        <StravaAuthBtn />
        <div className="font-mono">{JSON.stringify(data, undefined, 2)}</div>
      </div>
    </div>
  );
};

export default Settings;

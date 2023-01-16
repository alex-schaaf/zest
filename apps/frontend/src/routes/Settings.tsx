import useSWR from "swr";
import { Users } from "@prisma/client";
import StravaAuthButton from "../components/StravaAuthButton";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Settings = () => {
  const { isLoading, data, error } = useSWR<Users, Error>(
    "http://localhost:3000/users/1",
    fetcher
  );

  return (
    <div>
      <StravaAuthButton />
      <div className="p-12 font-mono">{JSON.stringify(data, undefined, 2)}</div>
    </div>
  );
};

export default Settings;

// http://localhost:5173/settings?state=&code=70ae5ea5b5af5c3f6ddf3749b9cffa168539df7c&scope=read,read_all

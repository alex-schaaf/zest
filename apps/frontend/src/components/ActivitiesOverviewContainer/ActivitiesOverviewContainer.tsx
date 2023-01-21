import React, { useEffect, useState } from "react";
import ActivitiesOverview from "../ActivitiesOverview/ActivitiesOverview";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { StravaActivities } from "@prisma/client";
import Card from "../Card";
import Loading from "../Loading";

const apiUrl = "http://localhost:3000";

const ActivitiesOverviewContainer: React.FC = () => {
  const dayOffset = 7;
  const [start, setStart] = useState<Date>();
  const [startPrevious, setStartPrevious] = useState<Date>();

  /** Set the relevant date ranges to query the most recent activities
   *  when component gets mounted */
  useEffect(() => {
    const now = new Date();
    const start = new Date(new Date().setDate(now.getDate() - dayOffset));
    setStart(start);
    const startPrevious = new Date(
      new Date().setDate(now.getDate() - 2 * dayOffset)
    );
    setStartPrevious(startPrevious);
  }, []);

  const {
    isLoading,
    data: activities,
    error,
  } = useSWR<StravaActivities[]>(
    start
      ? apiUrl + `/users/1/activities?start=${startPrevious?.toISOString()}`
      : null,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Card className="h-24 flex gap-4">
        <div className="text-4xl border-r-4 border-red-400 font-medium px-4">
          error
        </div>
        <div className="">
          <div className="font-medium">{error.message}</div>
          <div className="text-sm text-gray-500">
            Failed to fetch relevant data from the server.
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="font-bold text-lg text-gray-800">
        Last {dayOffset} days
      </div>
      <ActivitiesOverview start={start} activities={activities} />
    </div>
  );
};

export default ActivitiesOverviewContainer;

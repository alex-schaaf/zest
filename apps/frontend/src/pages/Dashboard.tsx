import SevenDayOverview from "@/components/SevenDayOverview"
import Spinner from "@/components/ui/Spinner"
import MonthlyOverview from "@/components/MonthlyOverview"
import { DashboardContext } from "@/contexts/dashboard-context"
import useActivities from "@/hooks/useActivities"
import dayjs from "dayjs"
import { PropsWithChildren } from "react"
import Card from "@/components/ui/Card"
import YearlyOverview from "@/components/YearlyOverview"
import Message from "@/components/ui/Message"
import LongestDistanceBarChartContainer from "@/components/LongestDistanceBarChartContainer"

const Dashboard = () => {
  const { activities, isLoading, isError } = useActivities({
    startDateGte: dayjs(new Date(new Date().getUTCFullYear(), 0, 1))
      .subtract(1, "year")
      .toDate(),
  })

  if (isLoading) {
    return (
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Message text={"Failed to load activities."} intent="error" />
      </div>
    )
  }

  if (!activities) {
    return (
      <Card className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
        <p className="text-lg font-bold">No activities found</p>
        <p>Make sure to synchronize with Strava</p>
      </Card>
    )
  }

  return (
    <DashboardContext.Provider value={{ activities }}>
      <div className="container mx-auto space-y-4">
        <SectionHeader>Last 7 days</SectionHeader>
        <SevenDayOverview />
        <SectionHeader>This Month in running</SectionHeader>
        <MonthlyOverview />
        <SectionHeader>This year in running</SectionHeader>
        <YearlyOverview />
        <SectionHeader>Statistics</SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card>
            <LongestDistanceBarChartContainer />
          </Card>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}

export default Dashboard

export const SectionHeader: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="text-lg font-bold text-gray-800 pt-8 first:pt-0">
      {props.children}
    </div>
  )
}

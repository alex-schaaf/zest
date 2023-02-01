import ActivitiesBarChartContainer from "@/components/ActivitiesBarChartContainer"
import Activities7DayStats from "@/components/Activities7DayStats"
import ActivitiesYearStats from "@/components/ActivitiesYearStats"
import Loading from "@/components/Loading"
import MonthlyOverview from "@/components/MonthlyOverview"
import { DashboardContext } from "@/contexts/dashboard-context"
import useActivities from "@/hooks/useActivities"
import dayjs from "dayjs"
import { PropsWithChildren } from "react"
import ErrorMessage from "@/components/ui/ErrorMessage"
import Card from "@/components/Card"

const Dashboard = () => {
  const { activities, isLoading, isError } = useActivities(
    dayjs(new Date(new Date().getUTCFullYear(), 0, 1))
      .subtract(1, "year")
      .toDate()
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ErrorMessage text={"Failed to load activities."} />
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
        <Activities7DayStats />
        <SectionHeader>This Month in running</SectionHeader>
        <MonthlyOverview />
        <SectionHeader>This year in running</SectionHeader>
        <ActivitiesYearStats />
        <ActivitiesBarChartContainer />
      </div>
    </DashboardContext.Provider>
  )
}

export default Dashboard

export const SectionHeader: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-lg font-bold text-gray-800">{props.children}</div>
}

import ActivitiesBarChartContainer from "@/components/ActivitiesBarChartContainer"
import Activities7DayStats from "@/components/Activities7DayStats"
import ActivitiesYearStats from "@/components/ActivitiesYearStats"
import Loading from "@/components/Loading"
import MonthlyOverview from "@/components/MonthlyOverview"
import { DashboardContext } from "@/contexts/dashboard-context"
import useActivities from "@/hooks/useActivities"
import dayjs from "dayjs"
import { PropsWithChildren } from "react"

const Dashboard = () => {
  const { activities, isLoading, isError } = useActivities(
    dayjs(new Date(new Date().getUTCFullYear(), 0, 1))
      .subtract(1, "year")
      .toDate()
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !activities) {
    return <div>error: failed to load activities</div>
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

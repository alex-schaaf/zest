import ActivitiesBarChartContainer from "@/components/ActivitiesBarChartContainer"
import ActivitiesOverviewContainer from "@/components/ActivitiesOverviewContainer"
import ActivitiesYearStats from "@/components/ActivitiesYearStats"
import MonthlyOverview from "@/components/MonthlyOverview"
import { createContext, PropsWithChildren } from "react"

const Dashboard = () => {
  return (
    <div className="container mx-auto space-y-4">
      <SectionHeader>Last 7 days</SectionHeader>
      <ActivitiesOverviewContainer />
      <SectionHeader>This Month in running</SectionHeader>
      <MonthlyOverview />
      <SectionHeader>This year in running</SectionHeader>
      <ActivitiesYearStats />
      <ActivitiesBarChartContainer />
    </div>
  )
}

export default Dashboard

export const SectionHeader: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-lg font-bold text-gray-800">{props.children}</div>
}

const DashboardContext = createContext()

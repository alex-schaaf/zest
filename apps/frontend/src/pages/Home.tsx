import ActivitiesBarChartContainer from "@/components/ActivitiesBarChartContainer"
import ActivitiesOverviewContainer from "@/components/ActivitiesOverviewContainer"
import ActivitiesYearStats from "@/components/ActivitiesYearStats"
import Card from "@/components/Card"
import DistanceStepChart from "@/components/DistanceStepChart"
import DistanceStepChartContainer from "@/components/DistanceStepChartContainer"
import MonthlyOverview from "@/components/MonthlyOverview"
import { PropsWithChildren } from "react"

const Home = () => {
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

export default Home

export const SectionHeader: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-lg font-bold text-gray-800">{props.children}</div>
}

import { PropsWithChildren } from "react"
import ActivitiesBarChartContainer from "../components/ActivitiesBarChartContainer"
import ActivitiesOverviewContainer from "../components/ActivitiesOverviewContainer"

const Home = () => {
  return (
    <div className="container mx-auto space-y-4">
      <SectionHeader>Last 7 days</SectionHeader>
      <ActivitiesOverviewContainer />
      <SectionHeader>This year in running</SectionHeader>
      <ActivitiesBarChartContainer />
    </div>
  )
}

export default Home

export const SectionHeader: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-lg font-bold text-gray-800">{props.children}</div>
}

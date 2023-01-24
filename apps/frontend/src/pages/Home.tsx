import { PropsWithChildren } from "react";
import ActivitiesBarChartContainer from "../components/ActivitiesBarChartContainer";
import ActivitiesOverviewContainer from "../components/ActivitiesOverviewContainer";
import StravaSyncBtn from "../components/StravaSyncBtn/StravaSyncBtn";

const Home = () => {
  return (
    <div className="container space-y-4 mx-auto">
      <div className="text-right">
        <StravaSyncBtn />
      </div>
      <SectionHeader>Last 7 days</SectionHeader>
      <ActivitiesOverviewContainer />
      <SectionHeader>This year in running</SectionHeader>
      <ActivitiesBarChartContainer />
    </div>
  );
};

export default Home;

export const SectionHeader: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="font-bold text-lg text-gray-800">{props.children}</div>
  );
};

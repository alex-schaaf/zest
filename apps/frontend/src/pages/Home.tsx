import ActivitiesBarChartContainer from "../components/ActivitiesBarChartContainer";
import ActivitiesOverviewContainer from "../components/ActivitiesOverviewContainer";
import StravaSyncBtn from "../components/StravaSyncBtn/StravaSyncBtn";

const Home = () => {
  return (
    <div className="container space-y-4 mx-auto">
      <div className="text-right">
        <StravaSyncBtn />
      </div>
      <div className="font-bold text-lg text-gray-800">Last 7 days</div>
      <ActivitiesOverviewContainer />
      <div className="font-bold text-lg text-gray-800">
        This year in running
      </div>
      <ActivitiesBarChartContainer />
    </div>
  );
};

export default Home;

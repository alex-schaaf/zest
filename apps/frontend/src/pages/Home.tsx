import ActivitiesOverviewContainer from "../components/ActivitiesOverviewContainer";
import StravaSyncBtn from "../components/StravaSyncBtn/StravaSyncBtn";

const Home = () => {
  return (
    <div className="space-y-4">
      <div className="text-right">
        <StravaSyncBtn />
      </div>
      <ActivitiesOverviewContainer />
    </div>
  );
};

export default Home;

import ActivitiesOverview from "../components/ActivitiesOverview/ActivitiesOverview";
import StravaSyncBtn from "../components/StravaSyncBtn/StravaSyncBtn";

const Home = () => {
  return (
    <div>
      <StravaSyncBtn />
      <ActivitiesOverview />
    </div>
  );
};

export default Home;

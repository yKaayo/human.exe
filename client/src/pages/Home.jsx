// Layout
import Challenge from "../layout/ChallengeSection";
import Intro from "../layout/Intro";

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <Intro />
      <Challenge />
    </div>
  );
};

export default Home;

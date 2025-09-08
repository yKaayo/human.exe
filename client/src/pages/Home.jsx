// Component
import Intro from "../components/Intro";
import Challenge from "../components/ChallengeSection";
import ScrollIndicator from "../components/ScrollIndicator";

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <Intro />
      <Challenge />
      <div className="min-h-dvh">
        <p className="text-white">Seja mais</p>
      </div>
      <ScrollIndicator />
    </div>
  );
};

export default Home;

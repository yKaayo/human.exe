// Components
import Intro from "../components/Intro";
import Challenge from "../components/ChallengeSection";
import ScrollIndicator from "../components/ScrollIndicator";
import StorySection from "../components/StorySection";
import AiWebsite from "../components/AiWebsite";

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <Intro />
      <Challenge />
      {/* <StorySection /> */}
      <ScrollIndicator />
      <AiWebsite />
    </div>
  );
};

export default Home;

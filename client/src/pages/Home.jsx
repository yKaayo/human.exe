// Components
import Intro from "../components/Intro";
import Challenge from "../components/ChallengeSection";
import ScrollIndicator from "../components/ScrollIndicator";
import StorySection from "../components/StorySection";
import AiWebsite from "../components/AiWebsite";
import MarketplaceSection from "../components/MarketplaceSection";

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <Intro />
      <Challenge />
      <MarketplaceSection />
      {/* <StorySection /> */}
      <AiWebsite />
      <ScrollIndicator />
    </div>
  );
};

export default Home;

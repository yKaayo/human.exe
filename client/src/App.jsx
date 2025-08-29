import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter, Routes, Route } from "react-router";

// Layout
import Header from "./layout/Header";

// Component
import ScrollIndicator from "./components/ScrollIndicator";

// Pages
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desafio" element={<Challenge />} />
      </Routes>

      <ScrollIndicator />
    </BrowserRouter>
  );
};

export default App;

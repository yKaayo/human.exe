import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

// Component
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";
import Memories from "./pages/Memories";
import Experience from "./pages/Experience";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desafio" element={<Challenge />} />
        <Route path="/experiencias" element={<Experience />} />
        <Route path="/memorias" element={<Memories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

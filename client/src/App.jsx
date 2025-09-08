import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

// Component
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desafio" element={<Challenge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

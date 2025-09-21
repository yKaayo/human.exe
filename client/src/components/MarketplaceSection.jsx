import { Link } from "react-router";

// Images
import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";

// Components
import GridMotion from "./GridMotion";
import StarBorder from "./StarBorder";

const MarketplaceSection = () => {
  const items = [
    "Design",
    img1,
    img5,
    "Canção",
    img2,
    "Programação",
    img3,
    "Interlocutor",
    img4,
    "Violão",
    img5,
    img2,
    "Desenho",
    "Design",
    img1,
    img5,
    "Canção",
    img2,
    "Programação",
    img3,
    "Interlocutor",
    img4,
    "Violão",
    img5,
    img2,
    "Desenho",
  ];

  return (
    <section className="relative mt-40 flex min-h-dvh flex-col items-center justify-center">
      <div className="absolute inset-0 z-1 w-full bg-linear-to-b from-[#030712] via-transparent to-[#030712]"></div>
      <div className="absolute inset-0 z-0">
        <GridMotion items={items} />
      </div>

      <div className="relative z-2"></div>
      <Link to="/experiencias">
        <StarBorder fontSize="3vw">Conhecer Experiências</StarBorder>
      </Link>
    </section>
  );
};

export default MarketplaceSection;

import { RGBA_ASTC_10x10_Format } from "three";
import Carousel from "../components/Carousel";

const Experience = () => {
  const data = [
    {
      id: 1,
      title: "Músicas no violino",
      img: "",
      service: "song",
    },
    {
      id: 1,
      title: "Músicas no violino",
      img: "",
      service: "song",
    },
    {
      id: 1,
      title: "Músicas no violino",
      img: "",
      service: "song",
    },
    {
      id: 1,
      title: "Músicas no violino",
      img: "",
      service: "song",
    },
    {
      id: 1,
      title: "Músicas no violino",
      img: "",
      service: "song",
    },
  ];

  return (
    <section className="min-h-dvh bg-gray-950">
      <div className="container mx-auto pt-28">
        <h2 className="text-4xl font-semibold text-white">
          NeuroLink Humanity
        </h2>

        <Carousel data={data} />
      </div>
    </section>
  );
};

export default Experience;

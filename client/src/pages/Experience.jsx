// Component
import Carousel from "../components/Carousel";

// Mock
import mockProducts from "../mocks/products.json";

const Experience = () => {
  return (
    <section className="min-h-dvh bg-gray-950">
      <div className="container mx-auto pt-28 px-3 sm:px-0">
        <h2 className="text-4xl font-semibold text-white">
          NeuroLink Humanity
        </h2>

        <Carousel data={mockProducts} />
        <Carousel data={mockProducts} />
      </div>
    </section>
  );
};

export default Experience;

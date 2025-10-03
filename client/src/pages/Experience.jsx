import { useEffect } from "react";

// Components
import Carousel from "../components/Carousel";
import ProductCreate from "../components/ProductCreate";

// Mock
import mockProducts from "../mocks/products.json";

// Context
import { useProduct } from "../contexts/useProduct";

const Experience = () => {
  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="min-h-dvh bg-gray-950">
      <div className="container mx-auto px-3 pt-28 sm:px-0">
        <h2 className="text-4xl font-semibold text-white">
          NeuroLink Humanity
        </h2>

        <Carousel data={mockProducts} />

        <ProductCreate />

        <Carousel data={products} />
      </div>
    </section>
  );
};

export default Experience;

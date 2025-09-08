import { Canvas } from "@react-three/fiber";

// Component
import { Experience } from "../components/Experience";
import StarBorder from "../components/StarBorder";

// Service
import { getQuestions } from "../services/ChatApi";

const Challenge = () => {
  const handleQuestion = async () => {
    await getQuestions("Começar a história");
  };

  return (
    <section className="flex h-dvh overflow-hidden items-center justify-center bg-gray-950">
      <Canvas
        className="h-full w-full"
        shadows
        camera={{ position: [0, 1.5, 3], fov: 45 }}
      >
        <Experience />
      </Canvas>

      <StarBorder
        className="absolute bottom-10"
        handleClick={handleQuestion}
        color="cyan"
        speed="5s"
      >
        Começar Minha Jornada
      </StarBorder>
    </section>
  );
};

export default Challenge;

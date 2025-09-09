import Lottie from "lottie-react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { toast } from "react-toastify";

// Component
import { Experience } from "../components/Experience";
import StarBorder from "../components/StarBorder";

// Service
import { getQuestions } from "../services/ChatApi";

// Lottie
import loadingAnim from "../assets/lottie/loading.json";

const Challenge = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [story, setStory] = useState("");

  const handleQuestion = async (answer) => {
    setIsLoading(true);

    try {
      const res = await getQuestions(answer);
      if (res?.error) return toast.error(res.error);
      console.log(res);
      setQuestions(res.questions);
      setStory(res.story);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-dvh items-center justify-center bg-gray-950">
      <Canvas
        className="h-full w-full"
        shadows
        camera={{ position: [0, 1.5, 3], fov: 45 }}
      >
        <Experience />
      </Canvas>

      <div className="absolute bottom-0 bg-linear-to-t w-full from-black/80 via-80% to-transparent pb-10">
        <div className="container mx-auto flex flex-col gap-5">
          {story && (
            <h3 className="text-center text-2xl text-balance text-white">
              {story}
            </h3>
          )}

          {questions ? (
            <div className="flex gap-3">
              {questions.map((question) => (
                <StarBorder
                  key={question.question}
                  className="relative w-1/2"
                  handleClick={() => handleQuestion(question)}
                  color="cyan"
                  speed="5s"
                >
                  {isLoading ? (
                    <Lottie
                      animationData={loadingAnim}
                      className="h-10"
                      autoplay
                      loop
                    />
                  ) : (
                    question.question
                  )}
                </StarBorder>
              ))}
            </div>
          ) : (
            <StarBorder
              className="relative"
              handleClick={() => handleQuestion("Iniciar minha jornada")}
              color="cyan"
              speed="5s"
            >
              {isLoading ? (
                <Lottie
                  animationData={loadingAnim}
                  className="absolute h-10"
                  autoplay
                  loop
                />
              ) : (
                "Começar Minha Jornada"
              )}
            </StarBorder>
          )}
        </div>
      </div>
    </section>
  );
};

export default Challenge;

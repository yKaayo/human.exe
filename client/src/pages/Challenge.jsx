import Lottie from "lottie-react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { toast } from "react-toastify";

// Components
import { Experience } from "../components/Experience";
import StarBorder from "../components/StarBorder";
import DecryptedText from "../components/DecryptedText";
import HealthBar from "../components/HealthBar";

// Service
import { getQuestions } from "../services/ChatApi";

// Lottie
import loadingAnim from "../assets/lottie/loading.json";

// Context
import { useUser } from "../contexts/useUser";

const Challenge = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [story, setStory] = useState("");
  const [life, setLife] = useState(80);
  const [gameEnded, setGameEnded] = useState(false);

  const { user } = useUser();

  const handleQuestion = async (answer) => {
    if (!user) {
      toast.error("Usuário não encontrado! Faça login para continuar.");
      return;
    }

    setIsLoading(true);

    try {
      let promptText;
      let lifeChange = 0;

      if (typeof answer === "object" && answer.question) {
        promptText = answer.question;
        lifeChange = answer.life || 0;
      } else {
        promptText = answer;
      }

      const newLife = Math.max(0, Math.min(100, life + lifeChange));

      const res = await getQuestions(promptText, newLife);
      if (res?.error) return toast.error(res.error);

      if (lifeChange !== 0) {
        setLife(newLife);

        const message =
          lifeChange > 0
            ? `+${lifeChange} pontos de vida!`
            : `${lifeChange} pontos de vida!`;

        if (lifeChange > 0) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }

      setStory(res.story);

      if (res.isEnding || newLife <= 0) {
        setGameEnded(true);
        setQuestions(null);

        toast.info(
          "História finalizada! Clique em 'Reiniciar' para jogar novamente.",
        );

        return;
      }

      setQuestions(res.questions);
    } catch (error) {
      console.error(error);
      toast.error("Erro na conexão neural");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    if (!user) {
      toast.error("Acesso negado! Faça login para iniciar o protocolo neural.");
      return;
    }
    handleQuestion("Iniciar minha jornada");
  };

  const handleRestart = () => {
    setLife(80);
    setStory("");
    setQuestions(null);
    setGameEnded(false);
    toast.info("Sistema reiniciado!");
  };

  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-gray-950">
      <HealthBar life={life} />

      <Canvas
        className="mt-48 h-full w-full"
        shadows
        camera={{ position: [0, 1.5, 3], fov: 45 }}
      >
        <Experience />
      </Canvas>

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-10">
        <div className="container mx-auto flex flex-col gap-5 px-4">
          {story && (
            <div className="rounded-lg border border-cyan-500/20 bg-black/60 p-4 backdrop-blur-sm">
              <h3 className="text-center text-xl leading-relaxed text-balance text-white">
                <DecryptedText
                  text={story}
                  speed={5}
                  maxIterations={15}
                  characters="ABCD1234!?"
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"
                  animateOn="view"
                  sequential={true}
                  useOriginalCharsOnly={true}
                />
              </h3>
            </div>
          )}

          {gameEnded ? (
            <StarBorder
              className="relative min-h-16"
              handleClick={handleRestart}
              color="purple"
              speed="3s"
              disabled={false}
            >
              <div className="p-4 text-center">
                <div className="text-lg font-bold">Reiniciar História</div>
                <div className="mt-1 text-sm opacity-80">
                  Começar uma nova jornada
                </div>
              </div>
            </StarBorder>
          ) : questions ? (
            <div className="flex gap-3">
              {questions.map((question, index) => (
                <StarBorder
                  key={`${question.question}-${index}`}
                  className="relative min-h-16 w-1/2"
                  handleClick={() => handleQuestion(question)}
                  speed="5s"
                  disabled={isLoading || !user}
                >
                  {isLoading ? (
                    <Lottie
                      animationData={loadingAnim}
                      className="h-10"
                      autoplay
                      loop
                    />
                  ) : (
                    <div className="p-3 text-center">
                      <div className="text-sm leading-relaxed">
                        {question.question}
                      </div>
                    </div>
                  )}
                </StarBorder>
              ))}
            </div>
          ) : (
            <StarBorder
              className="relative min-h-16"
              handleClick={handleStart}
              color="cyan"
              speed="5s"
              disabled={isLoading || !user}
            >
              {isLoading ? (
                <Lottie
                  animationData={loadingAnim}
                  className="h-10"
                  autoplay
                  loop
                />
              ) : (
                <div className="p-4 text-center text-lg">
                  {!user ? "Login Necessário" : "Iniciar Protocolo Neural"}
                </div>
              )}
            </StarBorder>
          )}
        </div>
      </div>
    </section>
  );
};

export default Challenge;

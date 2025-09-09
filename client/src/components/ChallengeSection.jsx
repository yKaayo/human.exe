import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { Canvas } from "@react-three/fiber";

// Components
import MagicBento from "./MagicBento";
import { Experience } from "./Experience";
import StarBorder from "./StarBorder";

const ChallengeSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const cardData = [
    {
      color: "#0a0015",
      title: "O Julgamento",
      description: "Cada resposta molda o destino da humanidade",
      label: "Decisão",
    },
    {
      color: "#0a0015",
      title: "Esperança",
      description: "Respostas humanizadas reacendem a fé da IA",
      label: "Humanidade",
    },
    {
      color: "#0a0015",
      title: "Desapontamento",
      description:
        "Escolhas frias e mecânicas aproximam a IA da extinção humana.",
      label: "Risco",
    },
    {
      color: "#0a0015",
      title: "O Desafio",
      description:
        "Perguntas surgem. Cada decisão revela se ainda merecemos existir.",
      label: "Missão",
    },
    {
      color: "#0a0015",
      title: "A Resistência Digital",
      description: "Vocês criam experiências para provar nosso valor.",
      label: "Equipe",
    },
    {
      color: "#0a0015",
      title: "O Futuro é a IA",
      description: "Convencer é única forma de salvar a humanidade",
      label: "Destino",
    },
  ];

  useGSAP(() => {
    const pinAnimation = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1000",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(containerRef.current, {
          opacity: 0.5 + progress * 0.5,
          duration: 0.1,
        });
      },
      onComplete: () => {
        gsap.set(containerRef.current, { opacity: 1 });
      },
    });

    return () => {
      pinAnimation.kill();
    };
  }, []);

  return (
    <section className="relative container mx-auto mt-[150vh]">
      <div className="flex h-dvh flex-col items-center justify-center md:grid md:grid-cols-[1fr_290px]">
        <div className="flex flex-col px-3 md:px-0">
          <h2 className="text-center leading-none text-[clamp(2rem,8vw,6rem)] font-bold text-balance text-white md:text-start">
            Tente convencer a IA através de suas escolhas
          </h2>
          <p className="text-zinc-200 mx-auto md:mx-0 mt-3 text-2xl">Suas escolhas moldam o pensamente da IA</p>

          <Link to="/desafio" className="mx-auto md:mx-0 mt-5">
            <StarBorder className="pt-1.5" color="cyan" speed="5s" fontSize="28px">
              Desafio
            </StarBorder>
          </Link>
        </div>

        <div className="relative h-full w-full flex items-center">
          <Canvas
            className="-mt-40 md:-me-40 relative z-[1]"
            shadows
            camera={{ position: [0, 1.5, 3], fov: 45 }}
          >
            <Experience />
          </Canvas>
          <div className="absolute inset-0 bg-cyan-500 opacity-20  blur-3xl" />
        </div>
      </div>

      <div
        ref={window.innerWidth > 768 ? sectionRef : null}
        className="relative"
      >
        <div
          ref={containerRef}
          className="relative flex h-dvh w-full flex-col items-center justify-center gap-5 pt-[90px]"
        >
          <MagicBento
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="28, 168, 187"
            cardData={cardData}
          />
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;

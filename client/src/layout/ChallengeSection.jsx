import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Component
import CardSwap, { Card } from "../components/CardSwap";

const ChallengeSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const pinAnimation = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1500",
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
    <section ref={sectionRef} className="relative mt-[120vh]">
      <div
        ref={containerRef}
        className="flex h-dvh items-center justify-center relative"
      >
        <div className="w-[60%]">
          <h2>VOCê ESTÁ PRONTO?</h2>
        </div>

        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card>
            <h3 className="mb-4 text-2xl text-white">Desafio 1</h3>
            <p className="text-white">Your content here</p>
          </Card>
          <Card>
            <h3 className="mb-4 text-2xl text-white">Card 2</h3>
            <p className="text-white">Your content here</p>
          </Card>
          <Card>
            <h3 className="mb-4 text-2xl text-white">Card 3</h3>
            <p className="text-white">Your content here</p>
          </Card>
        </CardSwap>
      </div>
    </section>
  );
};

export default ChallengeSection;

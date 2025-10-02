import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Component
import StarBorder from "./StarBorder";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AiWebsite = () => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(titleRef.current, { type: "chars" });

    gsap.fromTo(
      split.chars,
      {
        opacity: 0,
        y: 100,
        rotateX: -30,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative container mx-auto flex h-dvh flex-col items-center justify-center pt-20"
    >
      <h3
        ref={titleRef}
        className="text-center text-[clamp(2rem,8vw,6rem)] leading-none font-bold text-balance text-white"
      >
        A IA tentou<br></br>projetar esse site
      </h3>
      <p className="mx-auto mt-3 text-2xl text-zinc-200 md:mx-0">
        Porém será que a IA é capaz de fazer o que um humano faz? Veja você
        mesmo!
      </p>
      <a
        href="https://dreamy-semifreddo-d3d46e.netlify.app/"
        className="mx-auto mt-5 md:mx-0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StarBorder className="pt-1.5" color="cyan" speed="5s" fontSize="28px">
          Entrar no site
        </StarBorder>
      </a>
    </section>
  );
};

export default AiWebsite;

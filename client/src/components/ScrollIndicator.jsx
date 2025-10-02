import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Icon
import arrowBottom from "../assets/icons/arrow-bottom.svg";
import { useRef } from "react";

const ScrollIndicator = () => {
  const scrollRef = useRef(null);

  useGSAP(() => {
    if (scrollRef.current) {
      const bounceTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      bounceTimeline.to(scrollRef.current, {
        y: 20,
        opacity: 0.6,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="scroll-indicator fixed bottom-[10.5%] lg:bottom-8 left-1/2 transform -translate-x-1/2 w-[34px] h-[14px] z-10"
    >
      <img src={arrowBottom} alt="" />
    </div>
  );
};

export default ScrollIndicator;

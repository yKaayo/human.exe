import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const GridMotion = ({ items = [], gradientColor = "black" }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);

  const totalItems = 28;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`,
  );
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-[4] bg-[length:250px]"></div>
        <div className="relative z-[2] grid h-[150vh] w-[150vw] flex-none origin-center rotate-[-15deg] grid-cols-1 grid-rows-3 gap-4">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-7 gap-4"
              style={{ willChange: "transform, filter" }}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="relative">
                    <div className="flex h-[35vh] w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#111] text-[1.5rem] text-white">
                      {React.isValidElement(content) ? (
                        content
                      ) : typeof content === "string" &&
                        content.startsWith("http") ? (
                        <img
                          src={content}
                          alt="remote asset"
                          className="h-full w-full object-cover"
                        />
                      ) : typeof content === "string" &&
                        content.endsWith(".webp") ? (
                        <img
                          src={content}
                          alt="local asset"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="z-[1] p-2 text-center">{content}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="pointer-events-none relative top-0 left-0 h-full w-full"></div>
      </section>
    </div>
  );
};

export default GridMotion;

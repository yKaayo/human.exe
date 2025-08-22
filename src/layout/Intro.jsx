import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Video
import introVideo from "../assets/videos/bannerVideo.mp4";

// Icon
import arrowBottom from "../assets/icons/arrow-bottom.svg";
import logo from "../assets/icons/logo.svg";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  useGSAP(() => {
    gsap.from(".hero-main-container", {
      scale: 1.45,
      duration: 2.8,
      ease: "power3.out",
    });

    gsap.to(".overlay", {
      opacity: 0,
      duration: 2.8,
      ease: "power3.out",
      onComplete: () => {
        document.body.style.overflow = "visible";
        document.body.style.overflowX = "hidden";
      },
    });

    // Scroll Indicator Animation
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      const bounceTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      bounceTimeline.to(scrollIndicator, {
        y: 20,
        opacity: 0.6,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }

    // Main ScrollTrigger Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        scrub: 2,
        pin: true,
        start: "top top",
        end: "+=2000",
        ease: "none",
      },
    });

    // Set initial scale to prevent flickers
    tl.set(".hero-main-container", {
      scale: 1.25,
    });

    tl.to(".hero-main-container", {
      scale: 1,
      duration: 1,
    });

    tl.to(
      ".hero-main-logo",
      {
        opacity: 0,
        duration: 0.5,
      },
      "<"
    );

    tl.to(
      ".hero-main-image",
      {
        opacity: 0,
        duration: 0.9,
      },
      "<+=0.5"
    );

    tl.to(
      ".hero-main-container",
      {
        backgroundSize: "28vh",
        duration: 1.5,
      },
      "<+=0.2"
    );

    tl.fromTo(
      ".hero-text",
      {
        backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
      },
      {
        backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
         rgb(247, 77, 82) 50.011vh,
          rgb(145, 42, 105) 90.0183vh,
           rgba(32, 31, 66, 0) 140.599vh)`,
        duration: 3,
      },
      "<1.2"
    );

    // Logo purple animation
    tl.fromTo(
      ".hero-text-logo",
      {
        opacity: 0,
        maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
      },
      {
        opacity: 1,
        maskImage: `radial-gradient(
        circle at 50% 105.594%,
        rgb(0, 0, 0) 62.9372%,
        rgba(0, 0, 0, 0) 81.4686%
      )`,
        duration: 3,
      },
      "<0.2"
    );

    tl.set(".hero-main-container", { opacity: 0 });
    tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3");

    tl.set(
      ".hero-1-container",
      {
        maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
      },
      "<+=2.1"
    );

    tl.to(
      ".hero-1-container",
      {
        maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
        duration: 2,
      },
      "<+=0.2"
    );

    tl.to(
      ".hero-text-logo",
      {
        opacity: 0,
        duration: 2,
      },
      "<1.5"
    );

    tl.set(".hero-1-container", { opacity: 0 });
    tl.set(".hero-2-container", { visibility: "visible" });
    tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2");

    tl.fromTo(
      ".hero-2-container",
      {
        backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
      },
      {
        backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
         rgb(247, 77, 82) 50.011vh,
          rgb(145, 42, 105) 90.0183vh,
           rgba(32, 31, 66, 0) 140.599vh)`,
        duration: 3,
      },
      "<1.2"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="container min-w-screen overflow-hidden min-h-screen relative bg-gradient-to-br from-[#1c1829] via-[#1b1828] via-[#191724] via-[#161520] via-[#14131c] via-[#121218] to-[#111117]">
      {/* Overlay */}
      <div className="overlay fixed inset-0 bg-black z-10 pointer-events-none"></div>

      {/* Hero 1 Container */}
      <div className="hero-1-container w-full h-screen relative">
        {/* Hero Main Container with background logo */}
        <div
          className="hero-main-container w-full h-screen relative scale-125 bg-no-repeat bg-center pb-[200px]"
          style={{
            backgroundImage: `url("${logo}")`,
            backgroundSize: "1000vh",
            backgroundPosition: "50% 41.7%",
            backgroundOrigin: "content-box",
          }}
        >
          {/* Hero Main Video */}
          <video
            className="hero-main-image w-full h-screen absolute inset-0 object-cover"
            src={introVideo}
            loop
            muted
            autoPlay
            playsInline
          />
        </div>

        {/* Hero Text Logo Container */}
        <div className="hero-text-logo-container w-full h-screen absolute inset-0 -z-10 bg-transparent flex flex-col gap-16 justify-center items-center">
          <div>
            <h3
              className="hero-text text-[#ffb0c4] text-center uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.85] mt-0 w-full"
              style={{
                backgroundImage: `radial-gradient(
                    circle at 50% 200vh,
                    rgba(255, 214, 135, 0) 0,
                    rgba(157, 47, 106, 0.5) 90vh,
                    rgba(157, 47, 106, 0.8) 120vh,
                    rgba(32, 31, 66, 0) 150vh
                  )`,
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Num futuro onde pessoas são metade máquina e metade humano,
              cabe a você provar que ainda existe beleza, esperança e valor em
              ser realmente humano
            </h3>
          </div>
        </div>
      </div>

      {/* Hero 2 Container */}
      <div
        className="hero-2-container w-full h-screen absolute inset-0 opacity-0 invisible flex flex-col gap-8 justify-center items-start text-left px-8 lg:px-0 lg:max-w-[60%] lg:mx-auto"
        style={{
          backgroundImage: `radial-gradient(
              circle at 50% 200vh,
              rgba(255, 214, 135, 0) 0,
              rgba(157, 47, 106, 0.5) 90vh,
              rgba(157, 47, 106, 0.8) 120vh,
              rgba(32, 31, 66, 0) 150vh
            )`,
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <h3 className="text-4xl lg:text-6xl">Vice City, USA.</h3>
        <p className="max-w-[90%] text-base lg:text-2xl">
          Jason and Lucia have always known the deck is stacked against them.
          But when an easy score goes wrong, they find themselves on the darkest
          side of the sunniest place in America, in the middle of a criminal
          conspiracy stretching across the state of Leonida — forced to rely on
          each other more than ever if they want to make it out alive.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-[10%] lg:bottom-8 left-1/2 transform -translate-x-1/2 w-[34px] h-[14px] z-10">
        <img src={arrowBottom} alt="" />
      </div>
    </div>
  );
};

export default Intro;

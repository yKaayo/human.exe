import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Video
import introVideo from "../assets/videos/bannerVideo.mp4";

// Icon
import logo from "../assets/icons/logo.svg";

// Layout
import Video from "./Video";

// Util
import { initScroll } from "../utils/scrollSetup";
import { useRef } from "react";

const Intro = () => {
  const videoRef = useRef(null);
  const introRef = useRef(null);

  const lenis = initScroll();

  const initialAnimation = () => {
    gsap.from(".hero-main-container", {
      scale: 1.5,
      duration: 3,
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
  };

  const timelineAnimation = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#intro",
        scrub: 2,
        pin: true,
        start: "top top",
        end: "+=1500",
        ease: "none",
        onComplete: () => {
          gsap.set("#intro", {
            minHeight: "100vh",
          });
        },
      },
    });

    tl.fromTo(
      ".hero-main-container",
      {
        scale: 1.3,
      },
      {
        scale: 1,
        duration: 2,
      },
    );

    tl.to(
      ".hero-main-image",
      {
        opacity: 0,
        duration: 0.9,
      },
      "<+=0.5",
    );

    tl.to(
      ".hero-main-container",
      {
        backgroundSize: "28vh",
        duration: 1.5,
      },
      "<+=0.2",
    );

    tl.fromTo(
      ".hero-text",
      {
        backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(0, 255, 242, 1) 90vh,
          rgba(0, 255, 255, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
      },
      {
        backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(161, 229, 241) 0vh,
         rgb(28, 168, 187) 50.011vh,
          rgb(10, 121, 141) 90.0183vh,
           rgba(32, 31, 66, 0) 140.599vh)`,
        duration: 3,
      },
      "<1.2",
    );

    tl.set(".hero-main-container", { opacity: 0 });
    tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3").set(
      ".hero-1-container",
      {
        maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
      },
      "<+=2.1",
    );

    tl.to(
      ".hero-1-container",
      {
        maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
        duration: 2,
      },
      "<+=0.2",
    );

    tl.to(
      videoRef.current,
      {
        position: "fixed",
        opacity: 1,
        duration: 6, // Reduzido de 8 para 6
        ease: "power2.out",
        delay: 0.2,
      },
      "<+=2.5", // Ajustado timing
    ).to(videoRef.current, {
      scale: 0.9,
      duration: 1.5,
      onComplete: () => {
        ScrollTrigger.getById("intro-pin")?.kill();
        gsap.set("#intro", {
          position: "relative",
        });
      },
    });

    tl.scrollTrigger.vars.id = "intro-pin";
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    initialAnimation();
    timelineAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenis && lenis.destroy) {
        lenis.destroy();
      }
    };
  }, [lenis]);

  return (
    <div id="intro" ref={introRef} className="relative">
      <div className="relative container min-h-screen min-w-full overflow-hidden bg-gray-950">
        {/* Overlay */}
        <div className="overlay pointer-events-none fixed inset-0 z-10 overflow-hidden bg-black"></div>

        {/* Hero 1 Container */}
        <div className="hero-1-container relative h-screen w-full">
          {/* Hero Main Container with background logo */}
          <div
            className="hero-main-container relative h-screen w-full scale-125 bg-center bg-no-repeat pb-[250px] sm:pb-[200px]"
            style={{
              backgroundImage: `url("${logo}")`,
              backgroundSize: "1000vh",
              backgroundPosition: "50% 41.7%",
              backgroundOrigin: "content-box",
            }}
          >
            {/* Hero Main Video */}
            <video
              className="hero-main-image absolute inset-0 h-screen w-full object-cover"
              src={introVideo}
              loop
              muted
              autoPlay
              playsInline
            />
          </div>

          {/* Hero Text Logo Container */}
          <div className="hero-text-logo-container absolute inset-0 -z-10 flex h-screen w-full items-center justify-center bg-transparent">
            <h3
              className="hero-text w-full px-4 text-center text-4xl leading-[0.85] text-[#ffb0c4] uppercase sm:text-5xl lg:text-6xl"
              style={{
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Num futuro onde pessoas são metade máquina e metade humano, cabe a
              você provar que ainda existe beleza, esperança e valor em ser
              realmente humano
            </h3>
          </div>
        </div>

        <div id="video" ref={videoRef} className="h-dvh w-full opacity-0">
          <Video videoRef={videoRef} />

          <div className="hero-2-content pointer-events-none relative z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

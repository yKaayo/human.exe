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
        trigger: ".container",
        scrub: 2,
        pin: true,
        start: "top top",
        end: "+=2000",
        ease: "none",
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
      }
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

    

    tl.set(".hero-main-container", { opacity: 0 });
    tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3").set(
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
      videoRef.current,
      {
        position: "fixed",
        opacity: 1,
        duration: 8,
        ease: "power2.out",
        delay: 0.2,
      },
      "<+=3"
    ).to(videoRef.current, { scale: 0.9, duration: 2 });
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
    <div className="container min-w-full overflow-hidden min-h-screen relative bg-gradient-to-br from-[#1c1829] via-[#1b1828] via-[#191724] via-[#161520] via-[#14131c] via-[#121218] to-[#111117]">
      {/* Overlay */}
      <div className="overlay overflow-hidden fixed inset-0 bg-black z-10 pointer-events-none"></div>

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
              className="hero-text text-[#ffb0c4] text-center uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.85] mt-0 w-full px-4"
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
              Num futuro onde pessoas são metade máquina e metade humano, cabe a
              você provar que ainda existe beleza, esperança e valor em ser
              realmente humano
            </h3>
          </div>
        </div>
      </div>

      <div id="video" ref={videoRef} className="opacity-0 w-full h-dvh">
        <Video />

        <div className="hero-2-content relative z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Intro;

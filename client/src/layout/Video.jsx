import { useState, useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 96;

const Video = ({ videoRef }) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const framesImages = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;

      framesImages.push(img);
    }

    setImages(framesImages);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const scale = window.devicePixelRatio || 1;
    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;
    context.scale(scale, scale);

    const frameState = { frame: 0 };

    const render = () => {
      const img = images[frameState.frame];
      if (img?.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    gsap.to(frameState, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top top",
        end: `+=${TOTAL_FRAMES * 50}`,
        scrub: true,
        pin: true,
      },
      onUpdate: render,
    });

    images[0].onload = render;
    if (images[0].complete) render();
  }, [images, videoRef]);

  return <canvas ref={canvasRef} className="w-screen min-h-dvh object-cover" />;
};

export default Video;

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

    const updateCanvasSize = () => {
      const scale = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      context.scale(scale, scale);

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const frameState = { frame: 0 };

    const render = () => {
      const img = images[frameState.frame];
      if (!img) return;

      if (!img.complete || img.naturalWidth === 0) {
        return;
      }

      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      const imgWidth = 1920;
      const imgHeight = 1080;

      const scaleX = canvasWidth / imgWidth;
      const scaleY = canvasHeight / imgHeight;
      const scale = Math.max(scaleX, scaleY);

      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      const x = (canvasWidth - scaledWidth) / 2;
      const y = (canvasHeight - scaledHeight) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, scaledWidth, scaledHeight);
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
        onRefresh: updateCanvasSize,
      },
      onUpdate: render,
    });

    images[0].onload = render;
    if (images[0].complete) render();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [images, videoRef]);

  return (
    <div className="relative flex items-center justify-center">
      <h3 className="absolute text-center text-[clamp(2rem,8vw,6rem)] leading-[0.85] font-bold text-white text-shadow-lg/30 text-balance">
        VOCÊ ESTÁ PRONTO<br></br>PARA SALVAR A HUMANIDADE?
      </h3>

      <canvas
        ref={canvasRef}
        className="min-h-dvh w-screen object-cover"
        style={{
          display: "block",
          background: "#000",
        }}
      />
    </div>
  );
};

export default Video;

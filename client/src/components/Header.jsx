import Lottie from "lottie-react";
import { Link } from "react-router";
import { useRef, useState } from "react";

// Lottie
import menuAnim from "../assets/lottie/menu.json";

// Components
import StarBorder from "./StarBorder";
import Login from "./Login";
import Register from "./Register";

// Context
import { useUser } from "../contexts/useUser";
import Dropdown from "./Dropdown/Dropdown";

const Header = () => {
  const lottieRef = useRef();
  const [animationState, setAnimationState] = useState("start");
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Modals
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const { user } = useUser();

  const handleMenu = () => {
    // Anim
    const animation = lottieRef.current;
    if (!animation) return;

    if (isPlaying) return;

    const totalFrames = animation.getDuration(true) - 1;

    if (animationState === "start") {
      animation.goToAndStop(0, true);
      animation.playSegments([0, totalFrames], true);

      setAnimationState("end");
      setIsPlaying(true);
    } else if (animationState === "end") {
      animation.goToAndStop(totalFrames, true);
      animation.playSegments([totalFrames, 0], true);

      setAnimationState("start");
      setIsPlaying(true);
    }

    // Btn
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed top-0 z-10 w-full px-5 sm:px-0">
        <header className="relative container mx-auto mt-3 flex h-[60px] items-center rounded-2xl bg-white/20 px-10 py-3 shadow-2xl backdrop-blur-md md:justify-center">
          <h1 className="absolute font-bold text-white">HUMAN.EXE</h1>

          <div
            className={`absolute top-full left-0 flex w-full flex-col items-start rounded-2xl bg-white/30 px-10 py-6 backdrop-blur-md transition-all duration-500 ease-out md:visible md:static md:flex-row md:items-center md:justify-between md:rounded-none md:bg-transparent md:backdrop-blur-none md:transition-none ${
              menuIsOpen
                ? "visible mt-3 translate-y-0 opacity-100"
                : "invisible mt-0 -translate-y-4 opacity-0"
            } md:mt-0 md:translate-y-0 md:opacity-100`}
          >
            <nav>
              <ul className="flex flex-col gap-2 md:flex-row md:gap-6 md:px-0 md:py-0">
                <li
                  className={`transform transition-all delay-100 duration-300 md:translate-x-0 md:transform-none md:opacity-100 md:transition-none ${
                    menuIsOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                >
                  <Link
                    to="/"
                    className="block rounded-lg text-white transition-all duration-200 hover:translate-x-2 hover:bg-white/10 hover:text-gray-300 md:px-0 md:py-0 md:hover:translate-x-0 md:hover:bg-transparent"
                  >
                    Início
                  </Link>
                </li>
                <li
                  className={`transform transition-all delay-200 duration-300 md:translate-x-0 md:transform-none md:opacity-100 md:transition-none ${
                    menuIsOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                >
                  <Link
                    to="/desafio"
                    className="block rounded-lg text-white transition-all duration-200 hover:translate-x-2 hover:bg-white/10 hover:text-gray-300 md:px-0 md:py-0 md:hover:translate-x-0 md:hover:bg-transparent"
                  >
                    Desafio
                  </Link>
                </li>
                <li
                  className={`transform transition-all delay-200 duration-300 md:translate-x-0 md:transform-none md:opacity-100 md:transition-none ${
                    menuIsOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                >
                  <Link
                    to="/memorias"
                    className="block rounded-lg text-white transition-all duration-200 hover:translate-x-2 hover:bg-white/10 hover:text-gray-300 md:px-0 md:py-0 md:hover:translate-x-0 md:hover:bg-transparent"
                  >
                    Memórias
                  </Link>
                </li>
              </ul>
            </nav>

            {!user && (
              <div className="mt-3 flex gap-3 md:mt-0">
                <button
                  onClick={() => setLoginModalIsOpen((prev) => !prev)}
                  className="text-white"
                >
                  Entrar
                </button>

                <StarBorder
                  handleClick={() => setRegisterModalIsOpen((prev) => !prev)}
                  className="pt-1.5"
                  color="cyan"
                  speed="5s"
                >
                  Cadastrar
                </StarBorder>
              </div>
            )}
          </div>

          <div className="ms-auto flex items-center">
            {user && <Dropdown />}
            <button
              onClick={handleMenu}
              disabled={isPlaying}
              className={`-mx-7 transform transition-all duration-200 hover:scale-105 active:scale-95 md:hidden ${
                isPlaying ? "pointer-events-none opacity-75" : ""
              }`}
              aria-label={
                animationState === "start" ? "Abrir menu" : "Fechar menu"
              }
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={menuAnim}
                className="h-[80px] w-[80px]"
                color="#fff"
                autoplay={false}
                loop={false}
                onComplete={() => setIsPlaying(false)}
              />
            </button>
          </div>
        </header>
      </div>

      <Login
        isOpen={loginModalIsOpen}
        handleClose={() => setLoginModalIsOpen((prev) => !prev)}
        toRegister={() => {
          setRegisterModalIsOpen(true);
          setLoginModalIsOpen(false);
        }}
      />

      <Register
        isOpen={registerModalIsOpen}
        handleClose={() => setRegisterModalIsOpen((prev) => !prev)}
        toLogin={() => {
          setRegisterModalIsOpen(false);
          setLoginModalIsOpen(true);
        }}
      />
    </>
  );
};

export default Header;

import { useState, useRef } from "react";
import Lottie from "lottie-react";
import { toast } from "react-toastify";

// Components
import { DropdownMenu } from "./DropdownMenu";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { DropdownMenuSeparator } from "./DropdownMenuSeparator";

// Context
import { useUser } from "../../contexts/useUser";

// Lottie
import dropdownAnim from "../../assets/lottie/dropdown.json";

const User = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Community = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Subscription = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const Settings = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 6h8" />
    <path d="M16 6h4" />
    <path d="M10 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 18h4" />
    <path d="M12 18h8" />
    <path d="M10 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M4 12h4" />
    <path d="M12 12h8" />
  </svg>
);

const HelpCenter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

const SignOut = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

export default function Dropdown() {
  const lottieRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const desiredOpenRef = useRef(false);

  const { user, logoutUser } = useUser();

  const handleToggle = () => {
    const animation = lottieRef.current;
    if (!animation) return;

    const next = !desiredOpenRef.current;
    desiredOpenRef.current = next;

    const dir = next ? 1 : -1;

    if (dir === 1) setIsOpen(true);

    try {
      animation.setDirection(dir);
      animation.play();
    } catch (err) {
      const totalFrames = Math.max(0, animation.getDuration(true) - 1);
      if (dir === 1) {
        animation.goToAndPlay(0, true);
      } else {
        animation.goToAndPlay(totalFrames, true);
        animation.setDirection(-1);
      }
    }

    setIsPlaying(true);
  };

  const onAnimationComplete = () => {
    setIsPlaying(false);
    setIsOpen(desiredOpenRef.current);
  };

  const handleOpenChange = (next) => {
    if (isPlaying) return;
    desiredOpenRef.current = next;
    setIsOpen(next);
  };

  const handleLogout = () =>{
    logoutUser()
    toast.success("Você saiu com sucesso!")
  }

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1 rounded-lg text-sm font-semibold text-nowrap text-white`}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          Olá, {user?.name}
          <Lottie
            lottieRef={lottieRef}
            animationData={dropdownAnim}
            className="me-5 size-[32px] md:me-0"
            autoplay={false}
            loop={false}
            onComplete={onAnimationComplete}
          />
        </button>
      }
    >
      {/* <div className="flex flex-col space-y-1">
        <DropdownMenuItem active>
          <User className="mr-3 h-5 w-5 text-zinc-500" /> <span>Profile</span>
        </DropdownMenuItem>
      </div> */}

      {/* <DropdownMenuSeparator /> */}

      <div className="flex flex-col space-y-1">
        <DropdownMenuItem>
          <button onClick={handleLogout} className="flex items-center">
            <SignOut className="mr-3 h-5 w-5 text-zinc-500" />
            <span>Sair da conta</span>
          </button>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  );
}

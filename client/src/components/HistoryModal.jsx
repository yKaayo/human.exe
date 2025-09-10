import { useState } from "react";
import Lottie from "lottie-react";
import { toast } from "react-toastify";

// Lottie
import loadingAnim from "../assets/lottie/loading.json";

// Icon
import closeIcon from "../assets/icons/x.svg";

// Context
import { useUser } from "../contexts/useUser";

const HistoryModal = ({ isOpen, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  return (
    <div
      className={`fixed -top-3 -left-10 z-20 h-screen w-screen flex items-center justify-center bg-black/90 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative flex w-full items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-md space-y-6 rounded-lg border border-zinc-200 bg-gray-950 p-6 shadow-lg">
          <button className="absolute top-3 right-3" onClick={handleClose}>
            <img src={closeIcon} alt="Fechar o formulário" />
          </button>

          <div className="space-y-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Histórico das suas Histórias
            </h1>
            <p className="mt-1 text-sm text-zinc-200">
              Veja como suas escolhas afetaram sua história
            </p>
          </div>

          <div className="">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;

// Icon
import closeIcon from "../assets/icons/x.svg";

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/80 transition-opacity ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative m-3 flex h-[90vh] w-[90vw] flex-col overflow-hidden rounded-lg bg-gray-950 p-3">
        <button
          className="absolute top-3 right-3 z-10"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={closeIcon} className="size-7" alt="Fechar o pop-up" />
        </button>

        <div className="h-full pt-10 sm:pt-0 px-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

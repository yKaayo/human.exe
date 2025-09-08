// Icon
import closeIcon from "../assets/icons/x.svg";

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-black/80 transition-opacity ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="min-h-3/4 min-w-3/4 rounded-lg m-3 bg-gray-950 p-3 flex flex-col">
        <button className="ms-auto" onClick={() => setIsOpen((prev) => !prev)}>
          <img src={closeIcon} className="size-7" alt="Fechar o pop-up" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

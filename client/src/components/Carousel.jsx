import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Icons
import chevronLeft from "../assets/icons/chevron-left.svg";
import chevronRight from "../assets/icons/chevron-right.svg";

// Component
import Modal from "./Modal";
import StarBorder from "./StarBorder";

// Util
import { formatCurrency } from "../utils/formatCurrency";

// Services
import { addItem } from "../services/CartApi";

// Context
import { useUser } from "../contexts/useUser";
import { useCart } from "../contexts/useCart";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardSelect, setCardSelect] = useState(null);

  const { user } = useUser();
  const { getCard } = useCart();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setCardsPerView(4);
      else if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="relative flex items-center justify-center overflow-hidden px-6 py-10">
        <button
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          disabled={currentIndex === 0}
          className={`absolute left-0 z-10 rounded-full p-1.5 shadow ${currentIndex === 0 ? "cursor-not-allowed bg-gray-600" : "bg-gray-800 hover:bg-gray-700"} text-white`}
        >
          <img src={chevronLeft} className="size-8" alt="Voltar" />
        </button>

        <div className="relative mx-8 w-full overflow-hidden">
          <div
            className="flex w-full gap-6 transition-transform duration-500 ease-in-out sm:w-[95%]"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
            }}
          >
            {data.map((item, index) => (
              <button
                onClick={() => {
                  setModalIsOpen(true);
                  setCardSelect(item);
                }}
                key={`${item.id}-${index}`}
                className="overflow-hidden rounded-2xl bg-gray-900 shadow-xl"
                style={{
                  flex: `0 0 ${100 / cardsPerView}%`,
                  maxWidth: `${100 / cardsPerView}%`,
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <h3 className="p-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex >= data.length - cardsPerView}
          className={`absolute right-0 z-10 rounded-full p-1.5 shadow ${currentIndex >= data.length - cardsPerView ? "cursor-not-allowed bg-gray-600" : "bg-gray-800 hover:bg-gray-700"} text-white`}
        >
          <img className="size-8" src={chevronRight} alt="Próximo" />
        </button>
      </section>

      {cardSelect && (
        <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
          <div className="grid h-full gap-6 sm:grid-cols-2">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-lg">
              <img
                src={cardSelect.img}
                alt={cardSelect.title}
                className="h-full w-full rounded-lg object-cover object-center"
              />
            </div>

            <div className="flex flex-col text-white min-h-fit h-full justify-center">
              <h3 className="text-3xl font-bold">{cardSelect.title}</h3>
              <p className="text-gray-300">{cardSelect.description}</p>
              <p className="text-2xl font-semibold text-cyan-400 mt-3">
                {formatCurrency(cardSelect.price)}
              </p>

              <div className=" flex flex-wrap items-center gap-3 mt-5">
                <button
                  onClick={() => {
                    user
                      ? addItem(user.id, cardSelect.id)
                      : toast.info("Entre na sua conta primeiro!");
                    getCard();
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-800"
                >
                  Adicionar carrinho
                </button>
                <StarBorder>Comprar</StarBorder>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Carousel;

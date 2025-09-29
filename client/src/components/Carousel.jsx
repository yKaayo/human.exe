import { useState, useEffect } from "react";

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

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardSelect, setCardSelect] = useState(null);

  const { user } = useUser();

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
          onClick={() =>
            setCurrentIndex((prev) =>
              prev > 0 ? prev - 1 : data.length - cardsPerView,
            )
          }
          className="absolute left-0 z-10 rounded-full bg-gray-800 p-1.5 text-white shadow hover:bg-gray-700"
        >
          <img src={chevronLeft} className="size-8" alt="Voltar" />
        </button>

        <div className="relative mx-8 w-full overflow-hidden">
          <div
            className="flex gap-6 overflow-hidden transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
              width: `${(data.length * 100) / cardsPerView}%`,
            }}
          >
            {data.map((item, index) => (
              <button
                onClick={() => {
                  setModalIsOpen((prev) => !prev);
                  setCardSelect(item);
                }}
                key={`${item.id}-${index}`}
                className="overflow-hidden rounded-2xl bg-gray-900 shadow-xl"
                style={{
                  flex: `0 0 ${90 / data.length}%`,
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
          onClick={() =>
            setCurrentIndex((prev) =>
              prev < data.length - cardsPerView ? prev + 1 : 0,
            )
          }
          className="absolute right-0 z-10 rounded-full bg-gray-800 p-1.5 text-white shadow hover:bg-gray-700"
        >
          <img className="size-8" src={chevronRight} alt="Próximo" />
        </button>
      </section>

      {cardSelect && (
        <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
          <div className="my-3 flex flex-col items-center gap-3 sm:grid sm:grid-cols-2">
            <div className="rouded-lg mt-5 h-[250px] w-full overflow-hidden px-3 sm:h-full">
              <img
                src={cardSelect.img}
                alt={cardSelect.title}
                className="rouded-lg h-full w-full object-cover object-center"
              />
            </div>

            <div className="text-white">
              <h3 className="text-3xl font-bold">{cardSelect.title}</h3>
              <p>{cardSelect.description}</p>
              <p>{formatCurrency(cardSelect.price)}</p>

              <div className="mt-3 flex items-center gap-5">
                <button
                  onClick={() => addItem(user.id, cardSelect)}
                  className="rounded-lg border border-gray-300 px-3 py-1"
                >
                  Adicionar carrinho
                </button>
                <StarBorder className="">Comprar</StarBorder>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Carousel;

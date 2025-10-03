import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Component
import StarBorder from "../components/StarBorder";
import Modal from "./Modal";

// Service
import { createProduct } from "../services/ProductApi";

// Context
import { useUser } from "../contexts/useUser";
import { useProduct } from "../contexts/useProduct";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProductCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  const { user } = useUser();
  const { getProducts } = useProduct()

  useEffect(() => {
    const split = new SplitText(titleRef.current, { type: "chars" });

    gsap.fromTo(
      split.chars,
      {
        opacity: 0,
        y: 100,
        rotateX: -30,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    } else if (formData.title.length > 200) {
      newErrors.title = "Título não pode ter mais que 200 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }

    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = "Preço é obrigatório e deve ser numérico";
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = "Preço não pode ser negativo";
    }

    if (!formData.type.trim()) {
      newErrors.type = "Tipo é obrigatório";
    }

    if (!formData.image.trim()) {
      newErrors.image = "URL da imagem é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.info("Entre na sua conta primeiro");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await createProduct({ ...formData, producerId: user.id });

      if (result.error) {
        setSubmitMessage({
          type: "error",
          text: result.error,
        });
      } else if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Produto criado com sucesso!",
        });
        setTimeout(() => {
          setIsModalOpen((prev) => !prev);
        }, 2000);
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Erro ao conectar com o servidor",
      });
    } finally {
      setIsSubmitting(false);
      getProducts()
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-950 p-4">
      <div
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center py-8"
      >
        <h3
          ref={titleRef}
          className="mb-6 text-center text-[clamp(1rem,6vw,4rem)] leading-none font-bold text-balance text-white"
        >
          Compartilhe seu lado <br /> humano ao mundo
        </h3>

        <StarBorder className="pt-1.5" handleClick={() => setIsModalOpen(true)}>
          Criar experiência
        </StarBorder>
      </div>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form
          onSubmit={handleSubmit}
          className="h-full space-y-6 overflow-y-scroll"
        >
          <h2 className="mb-6 text-3xl font-bold text-white">
            Criar Nova Experiência
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
              placeholder="Nome do produto"
              maxLength={200}
            />
            <div className="mt-1 flex justify-between">
              {errors.title && (
                <p className="text-sm text-red-400">{errors.title}</p>
              )}
              <p className="ml-auto text-sm text-gray-500">
                {formData.title.length}/200
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
              placeholder="Descreva seu produto..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Preço *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                placeholder="99.90"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Tipo *
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                placeholder="Categoria do produto"
              />
              {errors.type && (
                <p className="mt-1 text-sm text-red-400">{errors.type}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              URL da Imagem *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white transition-colors focus:border-cyan-500 focus:outline-none"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-400">{errors.image}</p>
            )}
          </div>

          {submitMessage && (
            <div
              className={`rounded-lg p-4 ${submitMessage.type === "success" ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`}
            >
              {submitMessage.text}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Criando..." : "Criar Produto"}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="rounded-lg bg-gray-800 px-6 py-3 font-semibold text-gray-300 transition-colors hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductCreate;

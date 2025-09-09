import { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Lottie
import loadingAnim from "../assets/lottie/loading.json";

// Icon
import closeIcon from "../assets/icons/x.svg";

// Service
import { createMemory } from "../services/MemoryApi";

// Schema
import { memorySchema } from "../schemas/memorySchema";

// Context
import { useUser } from "../contexts/useUser";

const StoryForm = ({ isOpen, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(memorySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { author: "", memory: "", mediaUrl: "" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await createMemory(user.id, data.title, data.memory);
      console.log(res);
      

      

      if (res.success) {
        toast.success(res.data.message);
        reset();
        handleClose();
      } else {
        toast.error(res.error || "Erro ao salvar memória.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-black/90 ${
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
              Compartilhe sua memória
            </h1>
            <p className="mt-1 text-sm text-zinc-200">
              Ajude a provar para a IA que a humanidade merece existir.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm leading-none font-medium text-zinc-200"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                placeholder="Digite seu nome"
                {...register("title")}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-5 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none"
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="memory"
                className="text-sm leading-none font-medium text-zinc-200"
              >
                Sua memória
              </label>
              <textarea
                id="memory"
                placeholder="Escreva uma lembrança marcante..."
                {...register("memory")}
                className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-white px-3 py-3 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none"
              />
              {errors.memory && (
                <p className="text-xs text-red-500">{errors.memory.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="relative inline-flex h-9 w-full items-center justify-center overflow-hidden rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <Lottie
                  animationData={loadingAnim}
                  className="absolute h-10"
                  autoplay
                  loop
                />
              ) : (
                "Salvar memória"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;

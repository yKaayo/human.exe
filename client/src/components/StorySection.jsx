import { useState } from "react";
import { toast } from "react-toastify";

// Components
import StarBorder from "./StarBorder";
import StoryForm from "./StoryForm";

// Context
import { useUser } from "../contexts/useUser";

const StorySection = () => {
  const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);

  const { user } = useUser();

  const handleClick = () => {
    if (!user) return toast.info("Entre na sua conta primeiro!");
    setStoryModalIsOpen((prev) => !prev);
  };

  return (
    <>
      <section className="relative container mx-auto flex min-h-dvh flex-col items-center justify-center py-20">
        <h3 className="text-center text-[clamp(2rem,6vw,6rem)] leading-none font-bold text-balance text-white">
          Ajude-nos a provar para a IA que a humanidade merece existir.
          Compartilhe sua memória
        </h3>
        <p className="mt-5 text-center text-2xl text-zinc-200">
          Se somos apenas erros, provem-me o contrário. Mostrem-me a beleza que
          só vocês podem criar
        </p>

        <StarBorder handleClick={handleClick} fontSize="28px" className="mt-8">
          Contar minha história
        </StarBorder>
      </section>

      <StoryForm
        isOpen={storyModalIsOpen}
        handleClose={() => setStoryModalIsOpen((prev) => !prev)}
      />
    </>
  );
};

export default StorySection;

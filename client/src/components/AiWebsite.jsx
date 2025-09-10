import StarBorder from "./StarBorder";

const AiWebsite = () => {
  return (
    <section className="relative container mx-auto flex h-dvh flex-col items-center justify-center pt-20">
      <h3 className="text-center text-[clamp(2rem,8vw,6rem)] leading-none font-bold text-balance text-white">
        A IA tentou projetar esse site
      </h3>
      <p className="mx-auto mt-3 text-2xl text-zinc-200 md:mx-0">
        Porém será que a IA é capaz de fazer o que um humano faz? Veja você
        mesmo!
      </p>
      <a
        href="https://dreamy-semifreddo-d3d46e.netlify.app/"
        className="mx-auto mt-5 md:mx-0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StarBorder className="pt-1.5" color="cyan" speed="5s" fontSize="28px">
          ENTRAR NO SITE
        </StarBorder>
      </a>
    </section>
  );
};

export default AiWebsite;

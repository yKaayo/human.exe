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
import { login } from "../services/AuthApi";

// Context
import { useUser } from "../contexts/useUser";

// Schema
import { loginSchema } from "../schemas/authSchemas";

const UserIcon = () => (
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
    className="h-5 w-5 text-zinc-600"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = () => (
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
    className="h-4 w-4 text-zinc-500"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
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
    className="h-4 w-4 text-zinc-500"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const Login = ({ isOpen, handleClose, toRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { loginUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const res = await login(data.email, data.password);

      if (res.success) {
        loginUser(res.data);
        reset();
        handleClose();
        toast.success("Você entrou com sucesso!");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao entrar. Tente novamente.");
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
        <div className="relative w-full max-w-sm space-y-6 rounded-lg border border-zinc-200 bg-gray-950 p-6 shadow-lg">
          <button className="absolute top-3 right-3" onClick={handleClose}>
            <img src={closeIcon} alt="Fechar a seção entrar" />
          </button>

          {/* Cabeçalho */}
          <div className="space-y-3 text-center">
            <div className="inline-flex rounded-md border border-zinc-200 bg-zinc-100 p-2">
              <UserIcon />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Bem-vindo
              </h1>
              <p className="mt-1 text-sm text-zinc-200">Entre na sua conta</p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm leading-none font-medium text-zinc-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@email.com"
                {...register("email")}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-5 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm leading-none font-medium text-zinc-200"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                  className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-5 pr-10 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
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
                "Entrar"
              )}
            </button>
          </form>

          <div className="space-y-2 text-center">
            <p className="flex w-full items-center justify-center gap-2 text-sm text-zinc-200">
              Não tem uma conta?
              <button
                onClick={toRegister}
                className="font-medium text-white underline underline-offset-4 hover:text-zinc-500"
              >
                Cadastrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome muito longo"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
});

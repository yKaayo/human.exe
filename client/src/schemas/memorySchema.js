import { z } from "zod";

export const memorySchema = z.object({
  title: z.string().min(1, "Escreva um título para sua memória"),
  memory: z.string().min(10, "Sua memória deve ter pelo menos 10 caracteres"),
});

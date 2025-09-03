// Controllers
import { loginUser, registerUser } from "../controllers/userController.js";

export const users = async (fastify) => {
  fastify.post("/entrar", loginUser);
  fastify.post("/registrar", registerUser);
};

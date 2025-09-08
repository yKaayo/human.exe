// Controllers
import { loginUser, registerUser } from "../controllers/userController.js";

const users = async (fastify) => {
  fastify.post("/entrar", loginUser);
  fastify.post("/registrar", registerUser);
};

export default users;

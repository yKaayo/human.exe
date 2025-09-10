// Controllers
import {
  loginUser,
  registerUser,
  editUser,
  deleteUser,
} from "../controllers/userController.js";

const users = async (fastify) => {
  fastify.post("/entrar", loginUser);
  fastify.post("/registrar", registerUser);
  fastify.patch("/editar", editUser);
  fastify.delete("/editar", deleteUser);
};

export default users;

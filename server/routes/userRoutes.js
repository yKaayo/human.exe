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
  fastify.patch("/", editUser);
  fastify.delete("/", deleteUser);
};

export default users;

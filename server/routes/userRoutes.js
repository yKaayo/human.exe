// Controllers
import { getUsers } from "../controllers/userController.js";

export const users = async (fastify) => {
  fastify.get("/", getUsers);
};

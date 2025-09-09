// Controllers
import { create, getAll } from "../controllers/memoryController.js";

const memory = async (fastify) => {
  fastify.get("/", getAll);
  fastify.post("/", create);
};

export default memory;

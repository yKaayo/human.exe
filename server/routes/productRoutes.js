// Controllers
import { getAll, create } from "../controllers/productController.js";

const product = async (fastify) => {
  fastify.get("/", getAll);
  fastify.post("/", create);
};

export default product;

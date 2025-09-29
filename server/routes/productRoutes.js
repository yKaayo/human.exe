// Controllers
import { getAll } from "../controllers/productController.js";

const product = async (fastify) => {
  fastify.get("/", getAll);
};

export default product;

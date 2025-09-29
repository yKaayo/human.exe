// Controllers
import {
  createCartItem,
  getCart,
  removeCartItem,
} from "../controllers/cartController.js";

const cart = async (fastify) => {
  fastify.get("/:userId", getCart);
  fastify.post("/", createCartItem);
  fastify.delete("/", removeCartItem);
};

export default cart;

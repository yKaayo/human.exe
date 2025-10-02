// Controllers
import {
  createOrderFromCart,
  getUserOrders,
  getOrderDetails,
  updateOrder,
  cancelOrder,
} from "../controllers/orderController.js";

const orders = async (fastify) => {
  fastify.post("/", createOrderFromCart);
  fastify.get("/usuario/:userId", getUserOrders);
  fastify.get("/:orderId", getOrderDetails);
  fastify.patch("/:orderId", updateOrder);
  fastify.delete("/:orderId", cancelOrder);
};

export default orders;

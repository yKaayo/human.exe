// Controllers
import { promptUser } from "../controllers/chatController.js";

const chat = async (fastify) => {
  fastify.post("/", promptUser);
};

export default chat

import Fastify from "fastify";
import dotenv from "dotenv";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import MongoStore from "connect-mongo";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";

// Config
import { initOracle, closeOracle } from "./config/oracle.js";
import { mongoPlugin } from "./config/mongo.js";

// Routes
import users from "./routes/userRoutes.js";
import chat from "./routes/chatRoutes.js";
import memory from "./routes/memoryRoutes.js";
import product from "./routes/productRoutes.js";
import cart from "./routes/cartRoutes.js";
import order from './routes/orderRoutes.js';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

fastify.register(fastifyCookie);

fastify.register(mongoPlugin);

fastify.register(fastifySession, {
  rolling: true,
  cookieName: "sessionId",
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION,
    collectionName: "sessions",
    touchAfter: 24 * 3600,
  }),
  rolling: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  saveUninitialized: false,
  resave: false,
});

// Security
fastify.register(fastifyHelmet, {
  global: true,
  contentSecurityPolicy: false, // desative se estiver em dev e der erro com CSP
});

// Routes
fastify.register(users, { prefix: "/usuarios" });
fastify.register(chat, { prefix: "/chat" });
fastify.register(memory, { prefix: "/memorias" });
fastify.register(product, { prefix: "/produtos" });
fastify.register(cart, { prefix: "/carrinho" });
fastify.register(order, { prefix: "/pedido" });

const start = async () => {
  try {
    await initOracle();

    const port = process.env.PORT || 3000;
    fastify.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

process.on("SIGINT", async () => {
  await closeOracle();
  process.exit(0);
});

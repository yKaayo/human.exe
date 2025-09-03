import Fastify from "fastify";
import dotenv from "dotenv";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import MongoStore from "connect-mongo";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";

// Config
import { initOracle, closeOracle } from "./config/oracle.js";

// Routes
import { users } from "./routes/userRoutes.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

fastify.register(fastifyCookie);

fastify.register(fastifySession, {
  rolling: true,
  cookieName: "sessionId",
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION,
    collectionName: "sessions",
  }),
  rolling: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: false,
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

const start = async () => {
  try {
    await initOracle();

    await fastify.listen({ port: 3000 });
    console.log("🚀 Servidor rodando em http://localhost:3000");
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

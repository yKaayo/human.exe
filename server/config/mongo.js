import mongoose from "mongoose";
import "dotenv/config";

const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,

  maxPoolSize: 10,
  minPoolSize: 1,

  retryWrites: true,
  w: "majority",
};

export const connectMongoDB = async () => {
  try {
    console.log("🔌 Conectando ao MongoDB...");

    const mongoUri = process.env.MONGO_CONNECTION;

    await mongoose.connect(mongoUri, mongooseOptions);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose conectado ao MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("🔴 Erro de conexão Mongoose:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("🟡 Mongoose desconectado");
});

export const closeMongoDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 Conexão MongoDB fechada");
  } catch (error) {
    console.error("Erro ao fechar conexão MongoDB:", error);
  }
};

export const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const mongoPlugin = async function (fastify, options) {
  try {
    await connectMongoDB();

    fastify.decorate("mongoose", mongoose);

    fastify.addHook("preHandler", async (request, reply) => {
      if (!isMongoConnected()) {
        throw new Error("Database connection lost");
      }
    });

    fastify.addHook("onClose", async () => {
      await closeMongoDB();
    });
  } catch (error) {
    throw error;
  }
};

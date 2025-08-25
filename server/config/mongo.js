import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Mongoose conectado"))
  .catch((err) => console.error("Erro ao conectar com o MongoDB:", err));

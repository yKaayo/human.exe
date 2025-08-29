import { findUser, createUser } from "../models/userModel.js";

export const getUsers = async (req, rep) => {
  const users = await findUser();
  return rep.send(users);
}

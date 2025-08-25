import * as UserModel from "../models/userModel.js";

export const getUsers = async (req, rep) => {
  const users = await UserModel.getUsers();
  return rep.send(users);
}

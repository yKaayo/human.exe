// Model
import { findUser, createUser } from "../models/userModel.js";

// Util
import { hashPassword, comparePassword } from "../utils/hash.js";

export const loginUser = async (req, rep) => {
  const { email, password } = req.body;
  if (!email || !password)
    return rep
      .status(400)
      .send({ sucess: false, data: null, error: "Data missing" });

  const [user] = await findUser(email);
  console.log(user);

  if (user.length === 0)
    return rep
      .status(404)
      .send({ sucess: false, data: null, error: "User not found" });

  const matchPassword = await comparePassword(password, user.PASSWORD_HASH);
  console.log(matchPassword);
  

  if (matchPassword === false) {
    return rep
      .status(401)
      .send({ sucess: false, data: null, error: "Senha incorreta" });
  }
    

  const userData = {
    id: user.ID,
    name: user.NAME,
    email: user.EMAIL,
  };

  return rep.status(200).send({ sucess: true, data: userData, error: null });
};

export const registerUser = async (req, rep) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return rep
      .status(400)
      .send({ sucess: false, data: null, error: "Data missing" });
  }

  // Checking if user exist
  const verifyUser = await findUser(email);
  console.log(verifyUser);

  if (verifyUser.length > 0)
    return rep
      .status(400)
      .send({ sucess: false, data: null, error: "User already exist" });

  const hashedPassword = hashPassword(password);

  const user = await createUser(name, email, hashedPassword, new Date());

  if (!user)
    return rep
      .status(500)
      .send({ sucess: false, data: null, error: "Error creating user" });

  return rep.status(201).send({ sucess: true, data: user, error: null });
};

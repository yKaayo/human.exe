import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

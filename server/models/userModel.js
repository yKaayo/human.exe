import { getConnection } from "../config/oracle.js";

export const getUsers = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute("SELECT id, name, email FROM users");
    return result.rows;
  } finally {
    await conn.close();
  }
};

export const createUser = async (name, email) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO users (name, email) VALUES (:name, :email)`,
      [name, email],
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

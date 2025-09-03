import { getConnection } from "../config/oracle.js";

export const findUser = async (email) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      "SELECT * FROM cyberpunk_users WHERE email = :email",
      {
        email: { val: email },
      }
    );

    return result.rows;
  } finally {
    await conn.close();
  }
};

export const createUser = async (name, email, hashedPassword, createdAt) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO cyberpunk_users (id, name, email, password_hash, created_at) VALUES (seq_users.NEXTVAL, :name, :email, :password_hash, :created_at)`,
      {
        name: { val: name },
        email: { val: email },
        password_hash: { val: hashedPassword },
        created_at: { val: createdAt },
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

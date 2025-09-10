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

export const edit = async (name, email, hashedPassword) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `UPDATE cyberpunk_users 
       SET name = :name, email = :email, password_hash = :password_hash
       WHERE email = :email`,
      {
        name: { val: name },
        email: { val: email },
        password_hash: { val: hashedPassword },
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

export const delUser = async (email) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `DELETE FROM cyberpunk_users WHERE email = :email`,
      {
        email: { val: email },
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

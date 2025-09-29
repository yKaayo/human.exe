import { getConnection } from "../config/oracle.js";

export const findCartByUser = async (userId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `SELECT * FROM cyberpunk_cart WHERE id_user = :id_user`,
      { id_user: { val: userId } }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

export const addToCart = async (userId, productId, createdAt) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO cyberpunk_cart (id, product_id, created_at, id_user)
             VALUES (seq_cart.NEXTVAL, :product_id, :created_at, :id_user)`,
      {
        product_id: { val: productId },
        created_at: { val: createdAt },
        id_user: { val: userId },
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

export const deleteCartItem = async (cartId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `DELETE FROM cyberpunk_cart WHERE id = :id`,
      { id: { val: cartId } },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

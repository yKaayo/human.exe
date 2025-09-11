import { getConnection } from "../config/oracle.js";

export const createChoice = async (choice, userId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO cyberpunk_choices_history (id, choice_content, created_at, id_user) 
       VALUES (seq_users.seq_choice.nextval, :choice_content, :created_at, :id_user)`,
      {
        choice_content: choice,
        created_at: new Date(),
        id_user: userId,
      },
      { autoCommit: true }
    );

    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

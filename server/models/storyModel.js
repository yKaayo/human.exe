import { getConnection } from "../config/oracle.js";

export const create = async (story, userId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO cyberpunk_story_history (id, story_content, created_at, id_user) 
       VALUES (seq_story.nextval, :story_content, :created_at, :id_user)`,
      {
        story_content: story,
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

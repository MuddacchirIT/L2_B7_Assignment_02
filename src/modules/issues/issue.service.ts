import { pool } from "../../db";
import type { IIssue } from "./issue.interface";
const createIssueIntoDB = async (payLoad: IIssue) => {
  const { reporter_id, title, description, type, status } = payLoad;
  const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    reporter_id,
  ]);
  if (user.rows.length === 0) {
    throw new Error("User not exists");
  }
  const result = await pool.query(
    `INSERT INTO issues ( reporter_id, title, description, type, status ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [reporter_id, title, description, type, status],
  );
  return result;
};
export const issueService = {
  createIssueIntoDB,
};

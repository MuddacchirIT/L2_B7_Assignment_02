import bcrypt from "bcrypt";
import { pool } from "../../db/index";
import type { IUser } from "./user.interface";
const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age, role } = payLoad;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, role],
  );
  delete result.rows[0].password;
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const getSingleUserFromDB = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};
const updateUserIntoDB = async (id: number, payLoad: IUser) => {
  const { name, email, password, role } = payLoad;
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *`,
    [name, email, password, role, id],
  );
  return result;
};
const deleteUserFromDB = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id],
  );
  return result;
};
export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};

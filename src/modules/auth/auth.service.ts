import bcrypt from "bcrypt";
import { pool } from "../../db/index";
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials");
  }
  const userExists = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, userExists.password);
  if (!matchPassword) {
    throw new Error("Invalid Credentials");
  }
  return userExists;
};
export const authService = {
  loginUserIntoDB,
};

import jwt from "jsonwebtoken";
import config from "../../config/index";
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
    throw new Error("User not Exists");
  }
  const userExists = userData.rows[0];

  // const matchPassword = await bcrypt.compare(password, userExists.password);
  // if (!matchPassword) {
  //   throw new Error("Invalid Credentials");
  // }
  const jwtPayload = {
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1h",
  });
  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
};

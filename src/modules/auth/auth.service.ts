import { default as jwt, default as jwtPayload } from "jsonwebtoken";
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
  const user = userData.rows[0];

  // const matchPassword = await bcrypt.compare(password, userExists.password);
  // if (!matchPassword) {
  //   throw new Error("Invalid Credentials");
  // }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized");
  }
  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as jwtPayload;

  const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    decoded.email,
  ]);
  const user = userData.rows[0];
  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }
  if (!user?.is_active) {
    throw new Error("Forbidden!");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
  return { accessToken };
};
export const authService = {
  loginUserIntoDB,
  generateRefreshToken,
};

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = (...roles: any) => {
  console.log(roles);
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access!",
        });
      }
      const decoded = jwt.verify(token, config.secret as string);

      const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        decoded.email,
      ]);
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access!",
        });
      }
      if (!user?.is_active) {
        res.status(403).json({
          success: false,
          message: "Forbidden!",
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;

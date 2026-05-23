import CookieParser from "cookie-parser";
import cors from "cors";
import type { Application, Request, Response } from "express";
import express from "express";
import config from "./config/index";
import globalErrorHandler from "./middleware/globalErrorHandler";
import logger from "./middleware/logger";
import authRoute from "./modules/auth/auth.route";
import issuesRoute from "./modules/issues/issue.route";
import usersRoute from "./modules/users/user.route";

const app: Application = express();
const port = config.port;
app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req: Request, res: Response) => {
  //   res.send("Hello World!");
  res.status(200).json({
    success: true,
    message: "Welcome to Express Server",
  });
});

app.use("/api/users", usersRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/auth", authRoute);
app.use(globalErrorHandler);

export default app;

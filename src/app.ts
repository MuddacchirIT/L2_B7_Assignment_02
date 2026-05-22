import express, { type Application } from "express";
import fs from "fs";
import config from "./config/index";
import authRoute from "./modules/auth/auth.route";
import issuesRoute from "./modules/issues/issue.route";
import usersRoute from "./modules/users/user.route";
const app: Application = express();
const port = config.port;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", (req, res, next) => {
  console.log("Method - URL - Time:", req.method, req.url, Date.now());
  const log = `Method -> ${req.method}  Time -> ${Date.now()} URL -> ${req.url}\n`;
  fs.appendFile("logger.txt", log, (err) => {
    console.log(err);
  });
  next();
});

app.use("/api/users", usersRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/auth", authRoute);

export default app;

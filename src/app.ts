import express, { type Application } from "express";
import config from "./config/index";
import issuesRoute from "./modules/issues/issue.route";
import usersRoute from "./modules/users/user.route";
const app: Application = express();
const port = config.port;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoute);
app.use("/api/issues", issuesRoute);
// all post

// Get all users

// Get single user

// put operation

// delete operation

export default app;

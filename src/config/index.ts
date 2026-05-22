import dotenv from "dotenv";
import path from "path";
dotenv.config();
console.log(path.join(process.cwd(), ".env"));
const config = {
  connectionString: process.env.CONNECTIONSTRING as string,
  port: process.env.PORT as string,
  secret: process.env.JWT_SECRET_KEY as string,
  refresh_secret: process.env.JWT_REFRESH_SECRET_KEY as string,
};
export default config;

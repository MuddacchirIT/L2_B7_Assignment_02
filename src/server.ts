import app from "./app";
import config from "./config/index";
import { initDB } from "./db/index";
const main = async () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};
main();

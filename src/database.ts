import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const { PR_DB_HOST, PR_DEV_DB, PR_TEST_DB, PR_DB_USER, PR_DB_PASSWORD, ENV } =
  process.env;

let Client = new Pool({
  host: PR_DB_HOST,
  database: ENV === "dev" ? PR_DEV_DB : PR_TEST_DB,
  user: PR_DB_USER,
  password: PR_DB_PASSWORD,
});

export default Client;

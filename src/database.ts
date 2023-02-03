import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { HOST, TESTHOST, DB, USER, PASS, env } = process.env;

let Client: any;

if (env === "test") {
  Client = new Pool({
    host: TESTHOST,
    database: DB,
    user: USER,
    password: PASS,
  });
} else {  
  Client = new Pool({
    host: HOST,
    database: DB,
    user: USER,
    password: PASS,
  });
}

export default Client;

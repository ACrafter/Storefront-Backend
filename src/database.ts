import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { HOST, TESTHOST, DB, TESTDB, USER, PASS, ENV } = process.env;

let Client: any;

if (ENV === "test") {
  console.log('TESTING');
  Client = new Pool({
    host: TESTHOST,
    database: TESTDB,
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

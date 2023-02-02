import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { host, testhost, db, user, pass, env } = process.env;

let Client: any;

if (env === "test") {
  Client = new Pool({
    host: testhost,
    database: db,
    user,
    password: pass
  });
} else {  
  Client = new Pool({
    host,
    database: db,
    user,
    password: pass
  });
}

export default Client;

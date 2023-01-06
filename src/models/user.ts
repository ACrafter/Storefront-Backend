/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

dotenv.config();
const pepper = String(process.env.SECRET);
const salt = Number(process.env.SALT_ROUNDS);

export interface User {
  id?: Number;
  username?: String;
  password?: String;
  firstname?: String;
  lastname?: String;
}

export class UserStore {
  // RESTful CRUD Operations
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM users"; // Defining the SQL query
      const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive users: ${err}`);
    }
  }

  async show(id: String): Promise<User> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT username, firstname FROM users WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive user whose's id=${id}: ${err}`);
    }
  }

  async create(userInfo: User): Promise<User> {
    const username = userInfo.username;
    const firstname = userInfo.firstname;
    const password = bcryptjs.hashSync(`${userInfo.password}${pepper}`, salt);

    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO users (username, firstname, password,) VALUES ($1, $2 , $3) RETURNING id, username, firstname"; // Defining the SQL query
      const result = await connection.query(sql, [
        username,
        firstname,
        password,
      ]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't add user: ${err}`);
    }
  }

  async update(id: String, modify: String, newValue: String): Promise<User> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "UPDATE users SET " +
        modify +
        "=$1 WHERE id=$2 RETURNING username, firstname"; // Defining the SQL query
      const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update user who's id=${id}: ${err}`);
    }
  }

  async delete(id: String): Promise<User[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "DELETE FROM users WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update user who's id=${id}: ${err}`);
    }
  }

  // Speical Model Operations
  async authenticate(username: String, password: String): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT pass FROM users WHERE username=($1)";
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcryptjs.compareSync(password + pepper, user.pass)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

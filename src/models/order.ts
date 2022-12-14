/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Order {
  id?: String | Number;
  userid: String | Number;
  weight: Number;
  status: String;
  ETA?: String;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM orders"; // Defining the SQL query
      const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Orders: ${err}`);
    }
  }

  async getOne(id: Number): Promise<Order> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT id, userid, weight FROM orders WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      console.log(result.rows[0]);
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Order whose's id=${id}: ${err}`);
    }
  }

  async create(orderInfo: Order): Promise<Order> {
    const userid = orderInfo.userid;
    const weight = orderInfo.weight;
    const status = orderInfo.status;

    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO orders (userId, weight, status) VALUES ($1, $2 , $3) RETURNING id, userId, weight, status"; // Defining the SQL query
      const result = await connection.query(sql, [userid, weight, status]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't add Order: ${err}`);
    }
  }

  async show(id: String): Promise<Order> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT userid, weight, status FROM orders WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Order who's id=${id}: ${err}`);
    }
  }

  async update(
    modify: String,
    newValue: String | Number,
    id: String
  ): Promise<Order> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "UPDATE orders SET " +
        modify +
        "=$1 WHERE id=$2 RETURNING userid, weight, status"; // Defining the SQL query
      const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      console.log(result.rows[0]);
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Order who's id=${id}: ${err}`);
    }
  }

  async delete(id: String): Promise<Order[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "DELETE FROM orders WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Order who's id=${id}: ${err}`);
    }
  }
}

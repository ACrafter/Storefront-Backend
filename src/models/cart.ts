/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Cart {
  id?: String | Number;
  userid?: String | Number;
}

export class CartStore {
  async index(): Promise<Cart[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM carts"; // Defining the SQL query
      const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Carts: ${err}`);
    }
  }

  async getOne(id: Number): Promise<Cart> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM carts WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Cart whose's id=${id}: ${err}`);
    }
  }

  async create(cartInfo: Cart): Promise<Cart> {
    const userid = cartInfo.userid;


    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO carts (userId) VALUES ($1) RETURNING id, userId"; // Defining the SQL query
      const result = await connection.query(sql, [userid]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't add Cart: ${err}`);
    }
  }

  async show(id: String): Promise<Cart> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM carts WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Cart who's id=${id}: ${err}`);
    }
  }

  async update(
    modify: String,
    newValue: String | Number,
    id: String
  ): Promise<Cart> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "UPDATE carts SET " +
        modify +
        "=$1 WHERE id=$2 RETURNING userid, weight, status"; // Defining the SQL query
      const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Cart who's id=${id}: ${err}`);
    }
  }

  async delete(id: String): Promise<Cart[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "DELETE FROM carts WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Cart who's id=${id}: ${err}`);
    }
  }

  // Methods specific to the model
}

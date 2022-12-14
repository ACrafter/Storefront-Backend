/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Product {
  id?: Number;
  name?: String;
  type?: String;
  quantity?: Number;
  description?: String;
  picture?: unknown;
}

export class ProductStore {
  // RESTful CRUD Operations
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM products"; // Defining the SQL query
      const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Products: ${err}`);
    }
  }

  async show(id: String): Promise<Product> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT name, type, quantity FROM products WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      console.log(result.rows[0]);
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Product whose's id=${id}: ${err}`);
    }
  }

  async create(productInfo: Product): Promise<Product> {
    const name = productInfo.name;
    const type = productInfo.type;
    const quantity = productInfo.quantity;

    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO products (name, type, quantity) VALUES ($1, $2 , $3) RETURNING id, name, type, quantity"; // Defining the SQL query
      const result = await connection.query(sql, [name, type, quantity]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't add Product: ${err}`);
    }
  }

  async update(
    id: String,
    modify: String,
    newValue: String | Number
  ): Promise<Product> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "UPDATE products SET " +
        modify +
        "=$1 WHERE id=$2 RETURNING name , type , quantity"; // Defining the SQL query
      const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      console.log(result.rows[0]);
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Product who's id=${id}: ${err}`);
    }
  }

  async delete(id: String): Promise<Product[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "DELETE FROM products WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Product who's id=${id}: ${err}`);
    }
  }
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Product {
  id?: Number;
  name?: String;
  price?:Number;
  brand?: String;
  quantity?: String | null,
  description?: String;
  image?: unknown;
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

  async getOne(id: String): Promise<Product> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM products WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Product whose's id=${id}: ${err}`);
    }
  }

  async create(productInfo: Product): Promise<Product> {
    const name = productInfo.name;
    const price = productInfo.price;
    const brand = productInfo.brand;
    const desc = productInfo.description;
    const image = productInfo.image;

    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO products (name, price, brand, description, image) VALUES ($1, $2 , $3, $4, $5) RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [name, price, brand, desc, image]); // Running the SQL query on the DB & storing the result
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
        "=$1 WHERE id=$2 RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
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

  // Methods Special To The Model
 async filterPrice(min:Number, max:Number): Promise<Product[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM products WHERE price>=($1) AND price<=($2)"; // Defining the SQL query
      const result = await connection.query(sql, [min, max]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't filter`);
    }
  } 

async filterBrand(name: String): Promise<Product[]> {
  try {
    const connection = await Client.connect(); // Opening the connection
    const sql = "SELECT * FROM products WHERE brand LIKE '($1)%'"; // Defining the SQL query
    const result = await connection.query(sql, [name]); // Running the SQL query on the DB & storing the result
    connection.release(); // Closing the connection
    return result.rows; // Returning the result
  } catch (err) {
    throw new Error(`Couldn't filter`);
  }
} 
}

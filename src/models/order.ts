import { Product } from './product';
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Order {
  id?: String | Number;
  userid?: String | Number;
  weight: Number;
  status: String;
  ETA?: String;
}

export interface OrderProducts {
  id?: String | Number,
  orderid? : String | Number,
  productid? : String | Number
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
      const sql = "SELECT * FROM orders WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive Order whose id=${id}: ${err}`);
    }
  }

  async create(orderInfo: Order): Promise<Order> {
    const userid = orderInfo.userid;
    const eta = orderInfo.ETA;
    const weight = orderInfo.weight;
    const status = orderInfo.status;

    try {
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO orders (userId, weight, status, ETA) VALUES ($1, $2 , $3, $4) RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [userid, weight, status, eta]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't add Order: ${err}`);
    }
  }

  async show(id: String): Promise<Order> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM orders WHERE id=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Order whose id=${id}: ${err}`);
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
        "=$1 WHERE id=$2 RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Order whose id=${id}: ${err}`);
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
      throw new Error(`Couldn't delete Order whose id=${id}: ${err}`);
    }
  }

  // Methods specific to the model
  async getOrdersByUser(id: String): Promise<Order[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM orders WHERE userid=($1)"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't get the Orders of the User whose id=${id}: ${err}`);
    }
  }
  
  async addOrderProducts(order: String, prod: String): Promise<OrderProducts>{
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "INSERT INTO ordersproducts (productsid, ordersid) VALUES ($1, $2) RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [prod, order]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't Add Product whose id:${prod} to Order whose id:${order}`);
    }
  }

  async getOrderProducts(id: String): Promise<Product[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT productid FROM ordersproducts WHERE orderid=($1);"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update Order who's id=${id}: ${err}`);
    }
  }
}

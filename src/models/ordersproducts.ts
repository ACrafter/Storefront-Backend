/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface OrderProdcut {
    id?: String | Number;
    orderid?: String | Number;
    productid: String | Number;
    quantity: Number;
  }

export class OrderProductStore {
    async index(): Promise<OrderProdcut[]> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM ordersproducts"; // Defining the SQL query
          const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive orders: ${err}`);
        }
      }
    
      async create(x:OrderProdcut): Promise<OrderProdcut> {
        const orderid = x.orderid;
        const productid = x.productid;
        const quantity = x.quantity;

        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "INSERT INTO ordersproducts orderid, productid, quantity VALUES ($1, $2, $3) RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [orderid, productid, quantity]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive Orders-Products: ${err}`);
        }
      }

      async update(id: String, modify: String, newValue: String): Promise<OrderProdcut> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql =
            "UPDATE ordersproducts SET " +
            modify +
            "=$1 WHERE id=$2 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't update id=${id}: ${err}`);
        }
      }
}
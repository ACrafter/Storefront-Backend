/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import { ProductStore } from "../models/product";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const store = new ProductStore();

const index = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Show Product: ${err}`);
  }
};

const show = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Show Product: ${err}`);
  }
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  let auth: Boolean;
  try {
    const authorizationHeader = req.body.token;
    const token = authorizationHeader.split(" ")[1];
    verify(token, String(process.env.TOKEN));
    auth = true;
  } catch (err) {
    auth = false;
    res.status(401);
    res.json("Access denied, invalid token");
  }
  if (auth === true) {
    try {
      const name: String = req.body.name;
      const quantity: Number = Number(req.body.quantity);
      const type: String = req.body.type;

      const result = await store.create({ name, quantity, type });
      res.json(result);
    } catch (err) {
      res.send(`Error: ${err}`);
      throw new Error(`Error Couldn't Create Product: ${err}`);
    }
  }
};

const update = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const modify: String = req.body.prop;
    const newValue: String = req.body.value;
    const id: String = req.params.id;

    const result = await store.update(id, modify, newValue);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Update Product: ${err}`);
  }
};

const del = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const id: String = req.params.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Delete Product: ${err}`);
  }
};

const productsRoutes = (app: Express.Application): void => {
  app.get("/products", index);
  app.post("/products", create);
  app.get("/products/:id", show);
  app.patch("/products/:id", update);
  app.delete("/products/:id", del);
};

export default productsRoutes;

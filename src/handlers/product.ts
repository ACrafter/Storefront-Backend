/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import { ProductStore } from "../models/product";
import dotenv from "dotenv";
import Auth from "../middlewares/Auth";

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
  app.post("/products", Auth, create);
  app.get("/products/:id", show);
  app.patch("/products/:id", Auth, update);
  app.delete("/products/:id", Auth, del);
};

export default productsRoutes;

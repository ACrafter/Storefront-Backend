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
  const result = await store.index();
  res.json(result);
};

const show = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const result = await store.show(req.params.id);
  res.json(result);
  res.send();
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {

  try {
    const authorizationHeader = req.body.token
    const token = authorizationHeader.split(' ')[1]
    verify(token, String(process.env.TOKEN))
} catch(err) {
    res.status(401)
    res.json('Access denied, invalid token')
}

  const name: String = req.body.name;
  const quantity: Number = Number(req.body.quantity);
  const type: String = req.body.type;

  const result = await store.create({ name, quantity, type });
  res.json(result);
};

const update = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const modify: String = req.body.prop;
  const newValue: String = req.body.value;
  const id: String = req.params.id;

  const result = await store.update(id, modify, newValue);
  res.json(result);
};

const del = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const id: String = req.params.id;
  const result = await store.delete(id);
  res.json(result);
};

const productsRoutes = (app: Express.Application): void => {
  app.get("/products", index);
  app.post("/products", create);
  app.get("/products/:id", show);
  app.patch("/products/:id", update);
  app.delete("/products/:id", del);
};

export default productsRoutes; 

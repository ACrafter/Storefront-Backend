/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import { OrderStore } from "../models/order";

const store = new OrderStore();

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
  const userid: String = req.body.name;
  const weight: Number = Number(req.body.quantity);
  const status: String = req.body.status;

  const result = await store.create({ userid, weight, status });
  res.json(result);
};

const update = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const modify: String = req.body.prop;
  const newValue: String = req.body.value;
  const id: String = req.params.id;

  const result = await store.update(modify, newValue, id);
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

const userOrders = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const id: String = req.params.id;
  const result = await store.getOrdersByUser(id);
  res.json(result);
};

const ordersRoutes = (app: Express.Application): void => {
  app.get("/orders", index);
  app.post("/orders", create);
  app.get("/orders/:id", show);
  app.patch("/orders/:id", update);
  app.delete("/orders/:id", del);
  app.delete("/orders/user/:id", userOrders);
};

export default ordersRoutes;

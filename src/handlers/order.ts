/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
  try {
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Show Order: ${err}`);
  }
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const userid: String = req.body.userid;
    const weight: Number = Number(req.body.weight);
    const status: String = req.body.status;

    const result = await store.create({ userid, weight, status });
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Create Order: ${err}`);
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

    const result = await store.update(modify, newValue, id);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Update Order: ${err}`);
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
    throw new Error(`Error Couldn't Delete Order: ${err}`);
  }
};

const userOrders = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const id: String = req.params.id;
    const result = await store.getOrdersByUser(id);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Get Orders: ${err}`);
  }
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

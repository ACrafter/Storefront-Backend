/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import Auth from "../middlewares/Auth";
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
    const result = await store.getOne(req.params.id);
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
    const eta: String = req.body.eta;

    const result = await store.create({ userid, weight, status, eta });
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
}

  const getOrderProducts = async (
    req: Express.Request,
    res: Express.Response
  ): Promise<void> => {
    try {
      const id: String = req.params.id;
      const result = await store.getOrderProducts(id);
      res.json(result);
    } catch (err) {
      res.send(`Error: ${err}`);
      throw new Error(`Error Couldn't Get Orders: ${err}`);
    }
};

const addOrderProducts = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const order: String = req.params.id;
    const prod: String = req.body.prodid;
    const result = await store.addOrderProducts(order, prod);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Get Orders: ${err}`);
  }
};

const ordersRoutes = (app: Express.Application): void => {
  app.get("/orders", Auth, index);
  app.post("/orders", Auth, create);
  app.get("/orders/:id", Auth, show);
  app.patch("/orders/:id", Auth, update);

  // Special Methods
  app.get("/orders/user/:id", Auth, userOrders);
  app.get("/orders/products/:id", Auth, getOrderProducts);
  app.post("/orders/products/:id", Auth, addOrderProducts);
};

export default ordersRoutes;

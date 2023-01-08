/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import Auth from "../middlewares/Auth";
import { CartStore } from "../models/cart";

const store = new CartStore();

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

    const userid = req.body.userid;

    const result = await store.create({userid});
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

  const getCartProducts = async (
    req: Express.Request,
    res: Express.Response
  ): Promise<void> => {
    try {
      const id: String = req.params.id;
      const result = await store.getCartProducts(id);
      res.json(result);
    } catch (err) {
      res.send(`Error: ${err}`);
      throw new Error(`Error Couldn't Get Orders: ${err}`);
    }
};

const addCartProducts = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const order: String = req.params.id;
    const prod: String = req.body.prodid;
    const result = await store.addCartProducts(order, prod);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Get Orders: ${err}`);
  }
};

const getUserCart = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const userid: String = req.params.id;
    const result = await store.getCartId(userid);
    res.json(result);
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Get Orders: ${err}`);
  }
};

const cartsRoutes = (app: Express.Application): void => {
  app.get("/carts", Auth, index);
  app.post("/carts", Auth, create);
  app.get("/carts/:id", Auth, show);
  app.patch("/carts/:id", Auth, update);
  app.delete("/carts/:id", Auth, del);

  // Special Methods
  app.get("/carts/products/:id", Auth, getCartProducts);
  app.post("/carts/products/:id", Auth, addCartProducts);
  app.get("/carts/user/:id", Auth, getUserCart);
};

export default cartsRoutes;

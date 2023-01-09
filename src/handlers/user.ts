/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable valid-typeof */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import { UserStore } from "../models/user";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../middlewares/Auth";

const store = new UserStore();
dotenv.config();

const index = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.status(203);
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Get Users: ${err}`);
  }
};

const show = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const result = await store.show(req.params.id);
    res.json(result);
    res.send();
  } catch (err) {
    res.status(203);
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Get User: ${err}`);
  }
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const uName: String = req.body.uName;
    const fName: String = req.body.fName;
    const lName: String = req.body.lName;
    const password: String = req.body.password;
    
    const newUser = await store.create({
      username: uName,
      firstname: fName,
      lastname: lName,
      password,
    });

    const token = sign(password, String(process.env.TOKEN));
    res.json({userToken: token, userId: newUser.id});
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Create User: ${err}`);
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
    throw new Error(`Error Couldn't Update User: ${err}`);
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
    throw new Error(`Error Couldn't Delete User: ${err}`);
  }
};

const validate = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const uName: String = req.body.uName;
    const pass: String = req.body.pass;

    const result = await store.authenticate(uName, pass);
    if (result) {
      const token = sign(pass, String(process.env.TOKEN));
      res.json({userToken: token, userId: result.id});
    } else {
      res.send("None");
    }
  } catch (err) {
    res.send(`Error: ${err}`);
    throw new Error(`Error Couldn't Login User: ${err}`);
  }
};

const userRoutes = (app: Express.Application): void => {
  app.get("/users", Auth, index);
  app.post("/users/login", validate);
  app.post("/users", create);
  app.get("/users/:id", Auth, show);
  app.patch("/users/:id", Auth, update);
  app.delete("/users/:id", Auth, del);
};

export default userRoutes;

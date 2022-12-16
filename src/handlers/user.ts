/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import { UserStore } from "../models/user";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

const store = new UserStore();
dotenv.config();

const index = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const authorizationHeader = req.body.token;
    const token = authorizationHeader.split(" ")[1];
    verify(token, String(process.env.TOKEN));
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
  }
  const result = await store.index();
  res.json(result);
};

const show = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const authorizationHeader = req.body.token;
    const token = authorizationHeader.split(" ")[1];
    verify(token, String(process.env.TOKEN));
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
  }
  try {
  const result = await store.show(req.params.id);
  res.json(result);
  res.send();
} catch(err) {
  res.send(`Error: ${err}`)
  throw new Error(`Error Couldn't Create User: ${err}`)
}
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
  const uName: String = req.body.uName;
  const fName: String = req.body.fName;
  const status: String = req.body.status;
  const password: String = req.body.password;

  await store.create({
    username: uName,
    firstname: fName,
    pass: password,
    status,
  });

  const token = sign(password, String(process.env.TOKEN));
  res.json(token);
} catch(err) {
  res.send(`Error: ${err}`)
  throw new Error(`Error Couldn't Create User: ${err}`)
}
};

const update = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const authorizationHeader = req.body.token;
    const token = authorizationHeader.split(" ")[1];
    verify(token, String(process.env.TOKEN));
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
  }
  try {
  const modify: String = req.body.prop;
  const newValue: String = req.body.value;
  const id: String = req.params.id;

  const result = await store.update(id, modify, newValue);
  res.json(result);
} catch(err) {
  res.send(`Error: ${err}`)
  throw new Error(`Error Couldn't Update User: ${err}`)
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
} catch(err) {
  res.send(`Error: ${err}`)
  throw new Error(`Error Couldn't Delete User: ${err}`)
}
};

const auth = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
  const uName: String = req.body.uName;
  const pass: String = req.body.pass;

  const result = await store.authenticate(uName, pass);
  const x: null = null;
  if (typeof result !== typeof x) {
    const token = sign(pass, String(process.env.TOKEN));
    res.json(token);
  }
} catch(err) {
  res.send(`Error: ${err}`)
  throw new Error(`Error Couldn't Login User: ${err}`)
}
};

const userRoutes = (app: Express.Application): void => {
  app.get("/users", index);
  app.get("/users/login", auth);
  app.post("/users", create);
  app.get("/users/:id", show);
  app.patch("/users/:id", update);
  app.delete("/users/:id", del);
};

export default userRoutes;

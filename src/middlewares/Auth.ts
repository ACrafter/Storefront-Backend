import Express from "express";
import { verify } from "jsonwebtoken";

const Auth = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): void => {
  try {
    const token = req.params.token;
    verify(token, String(process.env.TOKEN));
    next();
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
  }
};

export default Auth;

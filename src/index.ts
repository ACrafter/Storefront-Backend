import Express from "express";
import ordersRoutes from "./handlers/order";
import productsRoutes from "./handlers/product";
import userRoutes from "./handlers/user";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded());

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.send("Hello World!");
});

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});

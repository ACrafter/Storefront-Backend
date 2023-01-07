import Express from "express";
import ordersRoutes from "./handlers/order";
import productsRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import cors from "cors";
const PORT = process.env.PORT ?? 3000;
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded());

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.send(
    "<h1>API Main Endpoints</h1><ul><li>Users</li><li>Orders</li><li>Products</li></ul>"
  );
});

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(PORT, () => {
  console.log("Server Running On Port 3000");
});

export default app;

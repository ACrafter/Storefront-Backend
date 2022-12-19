import { OrderProductStore } from "../../models/ordersproducts";
import { UserStore } from "../../models/user";
import { OrderStore } from "../../models/order";
import { ProductStore } from "../../models/product";

describe("OrdersProducts Model", () => {
  const U = new UserStore();
  const P = new ProductStore();
  const O = new OrderStore();
  const OP = new OrderProductStore();

  beforeAll(async () => {
    await U.create({
      username: "ACrafter",
      firstname: "Ahmed",
      pass: "123",
      status: "VIP",
    });

    await O.create({
      userid: "1",
      weight: 50,
      status: "Active",
    });

    await P.create({
      name: "Spoon",
      type: "Ketchen",
      quantity: 100,
    });
  });

  afterAll(async () => {
    await O.delete("1");
    await P.delete("1");
    await U.delete("1");
  });

  describe("Index Method", () => {
    it("should exist", () => {
      expect(OP.index).toBeDefined();
    });

    it("should return a list of all products", async () => {
      const res = await OP.index();
      expect(res).toEqual([]);
    });
  });

  describe("Create Method", () => {
    it("should exist", () => {
      expect(OP.create).toBeDefined();
    });

    it("should return the new product", async () => {
      const res = await OP.create({
        orderid: "1",
        productid: "1",
        quantity: 50,
      });
      expect(res).toEqual({
        id: 1,
        orderid: 1,
        productid: 1,
        quantity: 50,
      });
    });
  });
});

export { OrderProductStore };

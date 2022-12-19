import { OrderStore } from "../../models/order";
import { UserStore } from "../../models/user";

describe("Order Model", () => {
  const O = new OrderStore();
  const U = new UserStore();

  beforeAll(async () => {
    await U.create({
      username: "ACrafter",
      firstname: "Ahmed",
      pass: "123",
      status: "VIP",
    });
  });

  afterAll(async () => {
    await U.delete("2");
  });

  describe("Index Method", () => {
    it("should exist", () => {
      expect(O.index).toBeDefined();
    });

    it("should return a list of all orders", async () => {
      const res = await O.index();
      expect(res).toEqual([]);
    });
  });

  describe("Create Method", () => {
    it("should exist", () => {
      expect(O.create).toBeDefined();
    });

    it("should return a newly created user", async () => {
      const res = await O.create({ userid: "2", weight: 50, status: "Active" });
      expect(res).toEqual({ id: 2, userid: 2, weight: 50, status: "Active" });
    });
  });

  describe("Show Method", () => {
    it("should exist", () => {
      expect(O.show).toBeDefined();
    });

    it("should return a newly created order", async () => {
      const res = await O.show("2");
      expect(res).toEqual({ userid: 2, weight: 50, status: "Active" });
    });
  });

  describe("Update Method", () => {
    it("should exist", () => {
      expect(O.update).toBeDefined();
    });

    it("should return the updated user", async () => {
      const res = await O.update("status", "Completed", "2");
      expect(res).toEqual({ userid: 2, weight: 50, status: "Completed" });
    });
  });

  describe("Get User's Order  Method", () => {
    it("should exist", () => {
      expect(O.getOrdersByUser).toBeDefined();
    });

    it("should return the updated user", async () => {
      const res = await O.getOrdersByUser("2");
      expect(res).toEqual([{ id: 2, weight: 50, status: "Completed" }]);
    });
  });

  describe("Delete Method", () => {
    it("should exist", () => {
      expect(O.delete).toBeDefined();
    });

    it("should return a list of all remaining orders", async () => {
      const res = await O.delete("2");
      expect(res).toEqual([]);
    });
  });
});

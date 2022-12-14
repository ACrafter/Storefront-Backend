import { OrderStore } from "../order";
import { UserStore } from "../user";

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
    await U.delete("1");
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
      const res = await O.create({ userid: "1", weight: 50, status: "Active" });
      expect(res).toEqual({ id: 1, userid: 1, weight: 50, status: "Active" });
    });
  });

  describe("Show Method", () => {
    it("should exist", () => {
      expect(O.show).toBeDefined();
    });

    it("should return a newly created user", async () => {
      const res = await O.show("1");
      expect(res).toEqual({ userid: 1, weight: 50, status: "Active" });
    });
  });

  describe("Update Method", () => {
    it("should exist", () => {
      expect(O.update).toBeDefined();
    });

    it("should return the updated user", async () => {
      const res = await O.update("status", "Completed", "1");
      expect(res).toEqual({ userid: 1, weight: 50, status: "Completed" });
    });
  });

  describe("Delete Method", () => {
    it("should exist", () => {
      expect(O.delete).toBeDefined();
    });

    it("should return a list of all remaining orders", async () => {
      const res = await O.delete("1");
      expect(res).toEqual([]);
    });
  });
});

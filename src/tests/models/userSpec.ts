import { UserStore } from "../../models/user";

describe("User Model", () => {
  const U = new UserStore();

  beforeAll(async () => {
    await U.delete("3");
    await U.delete("4");
  });

  describe("Index Method", () => {
    it("should exist", () => {
      expect(U.index).toBeDefined();
    });

    it("should return a list of all users", async () => {
      const res = await U.index();
      expect(res).toEqual([]);
    });
  });

  describe("Create Method", () => {
    it("should exist", () => {
      expect(U.create).toBeDefined();
    });

    it("should return a new user", async () => {
      const res = await U.create({
        username: "ACrafter",
        firstname: "Ahmed",
        pass: "123",
        status: "VIP",
      });
      expect(res).toEqual({
        id: 5,
        username: "ACrafter",
        firstname: "Ahmed",
        status: "VIP",
      });
    });
  });

  describe("Get One Method", () => {
    it("should exist", () => {
      expect(U.show).toBeDefined();
    });

    it("should return a single user", async () => {
      const res = await U.show("5");
      expect(res).toEqual({
        username: "ACrafter",
        firstname: "Ahmed",
        status: "VIP",
      });
    });
  });

  describe("Update Method", () => {
    it("should exist", () => {
      expect(U.update).toBeDefined();
    });

    it("should return a single user", async () => {
      const res = await U.update("5", "username", "Yasser");
      expect(res).toEqual({
        username: "Yasser",
        firstname: "Ahmed",
        status: "VIP",
      });
    });
  });

  describe("Get VIP Method", () => {
    it("should exist", () => {
      expect(U.getVIP).toBeDefined();
    });

    it("should return all users with status VIP", async () => {
      const res = await U.getVIP();
      expect(res).toEqual([
        { username: "Yasser", firstname: "Ahmed", status: "VIP" },
      ]);
    });
  });

  describe("Get Frequent Method", () => {
    it("should exist", () => {
      expect(U.getFrequent).toBeDefined();
    });

    it("should return all users with status Frequent", async () => {
      const res = await U.getFrequent();
      expect(res).toEqual([]);
    });
  });

  describe("Get None Method", () => {
    it("should exist", () => {
      expect(U.getNone).toBeDefined();
    });

    it("should return all users with status None", async () => {
      const res = await U.getFrequent();
      expect(res).toEqual([]);
    });
  });

  describe("Delete Method", () => {
    it("should exist", () => {
      expect(U.delete).toBeDefined();
    });

    it("should return a single user", async () => {
      const res = await U.delete("5");
      expect(res).toEqual([]);
    });
  });
});

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
        password: "123",
        lastname: "Yasser",
      });
      expect(res).toEqual({
        id: 5,
        username: "ACrafter",
        firstname: "Ahmed",
        password: "123",
        lastname: "Yasser",
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
        password: "123",
        lastname: "Yasser",
      });
    });
  });

  describe("Update Method", () => {
    it("should exist", () => {
      expect(U.update).toBeDefined();
    });

    it("should return a single user", async () => {
      const res = await U.update("5", "username", "AYCrafter");
      expect(res).toEqual({
        username: "AYCrafter",
        firstname: "Ahmed",
        password: "123",
        lastname: "Yasser",
      });
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

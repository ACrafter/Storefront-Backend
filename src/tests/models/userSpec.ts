import { UserStore } from "../../models/user";

describe("User Model", () => {
  const U = new UserStore();
  let uid:Number | undefined;

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

      uid = res.id;
      res.password = "123"
      expect(res).toEqual({
        id: uid,
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
      const res = await U.show(String(uid));
      res.password = '123'
      expect(res).toEqual({
        id: uid,
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
      const res = await U.update(String(uid), "username", "AYCrafter");
      res.password = '123'
      expect(res).toEqual({
        id: uid,
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
      const res = await U.delete(String(uid));
      expect(res).toEqual([]);
    });
  });
});

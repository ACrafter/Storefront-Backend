import { ProductStore } from "../../models/product";

describe("Product Model", () => {
  const P = new ProductStore();

  describe("Index Method", () => {
    it("should exist", () => {
      expect(P.index).toBeDefined();
    });

    it("should return a list of all products", async () => {
      const res = await P.index();
      expect(res).toEqual([]);
    });
  });

  describe("Create Method", () => {
    it("should exist", () => {
      expect(P.create).toBeDefined();
    });

    it("should return the new product", async () => {
      const res = await P.create({
        name: "Spoon",
        type: "Ketchen",
        price: 100,
      });
      expect(res).toEqual({
        id: 2,
        name: "Spoon",
        type: "Ketchen",
        price: 100,
      });
    });
  });

  describe("Show Method", () => {
    it("should exist", () => {
      expect(P.show).toBeDefined();
    });

    it("should return a product with a given id", async () => {
      const res = await P.show("2");
      expect(res).toEqual({ name: "Spoon", type: "Ketchen", price: 100 });
    });
  });
});

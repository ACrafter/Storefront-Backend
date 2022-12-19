import supertest from "supertest";
import productsRoutes from "../../handlers/product";
import app from "../..";

const request = supertest(app);
productsRoutes(app);

describe("Product Routes", () => {

  describe("Unauthenticated Users", () => {
    it("Index Method", async () => {
      const response = await request.get("/products");
      expect(response.status).toEqual(200);
    });

    it("Show Method", async () => {
      const response = await request.get("/products/1");
      expect(response.status).toEqual(200);
    });

    it("Create Method", async () => {
      const response = await request
        .post("/products")
        .send({
          name: "Spoon",
          quantity: 200,
          type: "Kitchen",
        });
      expect(response.status).toEqual(401);
    });

    it("Update Method", async () => {
      const response = await request
        .patch("/products/1")
        .send({
          uName: "name",
          fName: "fName",
          password: "qwerty",
          status: "None",
        });
      expect(response.status).toEqual(401);
    });

    it("Delete Method", async () => {
      const response = await request.delete("/products/1");
      expect(response.status).toEqual(401);
    });
  });

  describe("Authenticated Users", () => {
    let loginToken:String;
    beforeAll(async () => {
        const response = await request
        .post("/users")
        .send({
          uName: "name",
          fName: "fName",
          password: "qwerty",
          status: "None",
        });
      loginToken = response.body;
    })

    afterAll(async () => {
        await request.delete("/users/1")
    })

    it("Create Method", async () => {
        const response = await request
          .post("/products")
          .send({
            name: "Spoon",
            quantity: 200,
            type: "Kitchen",
            token: loginToken
          });
        expect(response.status).toEqual(200);
      });
  
      it("Update Method", async () => {
        const response = await request
          .patch("/products/1")
          .send({
            prop: "quantity",
            value: 150,
            token: loginToken
          });
        expect(response.status).toEqual(200);
      });
  
      it("Delete Method", async () => {
        const response = await request.delete("/products/1").send({token: loginToken});
        expect(response.status).toEqual(200);
      });
  });
});

import supertest from "supertest";
import ordersRoutes from "../../handlers/order";
import userRoutes from "../../handlers/user";
import app from "../..";

const request = supertest(app);
ordersRoutes(app);
userRoutes(app);

describe("Order Routes", () => {
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
  });

  afterAll(async () => {
    await request.delete("/users/1")
  });

  describe('Unauthenticated Users', () => {
    it("Create Method", async () => {
      const response = await request
        .post("/orders")
        .send({ status: "Active", userid: "1", weight: 100 });
      expect(response.status).toEqual(401);
    });
  
    it("Index Method", async () => {
      const response = await request.get("/orders");
      expect(response.status).toEqual(401);
    });
  
    it("Show Method", async () => {
      const response = await request.get("/orders/1");
      expect(response.status).toEqual(401);
    });
  
    it("Update Method", async () => {
      const response = await request
        .patch("/orders/1")
        .send({ prop: "weight", value: 120 });
      expect(response.status).toEqual(401);
    });
  
    it("Delete Method", async () => {
      const response = await request.delete("/orders/1");
      expect(response.status).toEqual(401);
    });
  })

  describe('Authenticated Users', () => {
    it("Create Method", async () => {
      const response = await request
        .post("/orders")
        .send({ status: "Active", userid: "1", weight: 100, token:loginToken });
      expect(response.status).toEqual(200);
    });
  
    it("Index Method", async () => {
      const response = await request.get("/orders").send({token:loginToken});
      expect(response.status).toEqual(200);
    });
  
    it("Show Method", async () => {
      const response = await request.get("/orders/1").send({token:loginToken});
      expect(response.status).toEqual(200);
    });
  
    it("Update Method", async () => {
      const response = await request
        .patch("/orders/1")
        .send({ prop: "weight", value: 120, token: loginToken });
      expect(response.status).toEqual(200);
    });
  
    it("Delete Method", async () => {
      const response = await request.delete("/orders/1").send({token:loginToken});
      expect(response.status).toEqual(200);
    });
  })

 
});

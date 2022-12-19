import supertest from "supertest";
import ordersRoutes from "../../handlers/order";
import { UserStore } from "../../models/user";
import app from "../..";

const request = supertest(app);
ordersRoutes(app);

describe("Order Routes", () => {
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

  it("Create Method", async () => {
    const response = await request
      .post("/orders")
      .send({ status: "Active", userid: "1", weight: 100 });
    expect(response.status).toEqual(200);
  });

  it("Index Method", async () => {
    const response = await request.get("/orders");
    expect(response.status).toEqual(200);
  });

  it("Show Method", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toEqual(200);
  });

  it("Update Method", async () => {
    const response = await request
      .patch("/orders/1")
      .send({ prop: "weight", value: 120 });
    expect(response.status).toEqual(200);
  });

  it("Delete Method", async () => {
    const response = await request.delete("/orders/1");
    expect(response.status).toEqual(200);
  });
});

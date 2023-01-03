import supertest from "supertest";
import userRoutes from "../../handlers/user";
import app from "../..";

const request = supertest(app);
userRoutes(app);

describe("User Routes", () => {
  let loginToken: String;

  describe("Unauthenticated Users", () => {
    it("Index Method", async () => {
      const response = await request.get("/users");
      expect(response.status).toEqual(401);
    });

    it("Show Method", async () => {
      const response = await request.get("/users/4");
      expect(response.status).toEqual(401);
    });

    it("Create Method", async () => {
      const response = await request
        .post("/users")
        .send({
          uName: "name",
          fName: "fName",
          password: "qwerty",
          status: "None",
        });
      loginToken = response.body;
      expect(response.status).toEqual(200);
    });

    it("Update Method", async () => {
      const response = await request
        .patch("/users/2")
        .send({
          prop: "fName",
          value: "fName",
          id: "1"
        });
      expect(response.status).toEqual(401);
    });

    it("Delete Method", async () => {
      const response = await request.delete("/users/1");
      expect(response.status).toEqual(401);
    });
  });

  describe("Authenticated Users", () => {
    it("Index Method", async () => {
      const response = await request.get("/users").send({ token: loginToken }); 
      expect(response.status).toEqual(200);
    });

    it("Show Method", async () => {
      const response = await request
        .get("/users/1")
        .send({ token: loginToken });
      expect(response.status).toEqual(200);
    });

    it("Update Method", async () => {
      const response = await request
        .patch("/users/1")
        .send({
          prop: "username",
          value: "newName",
          id: "1",
          token: loginToken,
        });
      expect(response.status).toEqual(200);
    });

    it("Delete Method", async () => {
      const response = await request
        .delete("/users/1")
        .send({ token: loginToken });
      expect(response.status).toEqual(200);
    });
  });
});

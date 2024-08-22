import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "1c",
      name: "Client 0",
      document: "0000",
      email: "client@user.com",
      street: "some address",
      number: "1",
      complement: "",
      city: "some city",
      state: "some state",
      zipCode: "000",
    });

    expect(response.status).toBe(201);    
  });
});

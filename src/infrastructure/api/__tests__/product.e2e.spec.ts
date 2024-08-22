import request from "supertest";
import { app, sequelize } from "../express";


describe("E2E for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should add a product successfully", async () => {
    // Dados da requisição
    const productInput = {
      name: "Product 1",
      description: "Description 1",
      stock: 100,
      purchasePrice: 50,
    };

    // Chama a rota
    const response = await request(app).post("/products").send(productInput);

    // Verifica o status da resposta
    expect(response.status).toBe(201);
  });
});

import request from "supertest";
import {app, sequelize} from "../express";

describe("E2E for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a product", async () => {

        const response = await request(app).post("/products").send({
          name: "Product 1",
          description: "Product 1 description",
          purchasePrice: 100,
          stock: 10,
        });

        expect(response.status).toBe(201);
    })
})
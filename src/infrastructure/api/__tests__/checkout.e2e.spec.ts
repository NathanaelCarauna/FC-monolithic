import request from "supertest";
import { PlaceOrderInputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";
import { app, sequelize } from "../express";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";

describe("E2E for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it("Should throw an error 500 when client doesnt exists", async () => {
    
    const props: PlaceOrderInputDto = {
      clientId: "1",
      products: [
        {
          productId: "1",
        },
        {
          productId: "2",
        },
      ],
    };
    const response = await request(app).post("/checkout").send(props);
    expect(response.status).toBe(500);
  });

  it("Should process the order", async () => {
    
    await ClientModel.create({
      id: "1",
      name: "Client 0",
      document: "0000",
      email: "client@user.com",
      street: "some address",
      number: "1",
      complement: "",
      city: "some city",
      state: "some state",
      zipCode: "000",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description for Product 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description for Product 2",
      salesPrice: 45,
      purchasePrice: 150,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const props: PlaceOrderInputDto = {
      clientId: "1",
      products: [
        {
          productId: "1",
        },
        {
          productId: "2",
        },
      ],
    };
    const response = await request(app).post("/checkout").send(props);
    expect(response.status).toBe(200);
  });
});

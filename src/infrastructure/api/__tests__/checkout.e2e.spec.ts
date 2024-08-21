import request from "supertest";
import { PlaceOrderInputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";
import { app, sequelize } from "../express";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";

describe("E2E for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

//   beforeAll(async () => {
//     await sequelize.close();
//   });

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
    const client = await request(app).post("/clients").send({
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
    });
    expect(client.status).toBe(201);   
    const clientInDb = await ClientModel.findOne({ where: { id: "1" } });
    // expect(clientInDb).not.toBeNull();

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
});

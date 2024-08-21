import request from "supertest";
import { app, sequelize } from "../express";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";


describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should return an invoice", async () => {
    // Primeiro, crie uma invoice no banco de dados
    const props = {
      id: "1",
      name: "Invoice",
      document: "123456",
      state: "State",
      street: "Street",
      city: "City",
      complement: "Complemente",
      number: "1",
      zipCode: "1234",
      items: [
        {
          id: "1",
          name: "Invoice item",
          price: 100,
        },
      ],
      total: 100,
    };
    const invoice = await InvoiceModel.create(props);

    const response = await request(app).get(`/invoice/${invoice.id}`).send();
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(props.id);
    expect(response.body.name).toBe(props.name);
    expect(response.body.document).toBe(props.document);
    expect(response.body.address._street).toBe(props.street);
    expect(response.body.address._number).toBe(props.number);
    expect(response.body.address._complement).toBe(props.complement);
    expect(response.body.address._city).toBe(props.city);
    expect(response.body.address._state).toBe(props.state);
    expect(response.body.address._zipCode).toBe(props.zipCode);
    expect(response.body.items.length).toBe(1);
    expect(response.body.total).toBe(100);
  });

  it("Should return 404 if invoice is not found", async () => {
    const response = await request(app).get("/invoice/999").send();

    expect(response.status).toBe(500);
  });
});

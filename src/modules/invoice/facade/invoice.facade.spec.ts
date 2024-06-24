import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeFactory from "../factory/Invoice.facade.factory";

describe("Invoice facade tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find an invoice", async () => {
    const invoice = {
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
    await InvoiceModel.create(invoice);
    
    const facade = InvoiceFacadeFactory.create();
    const result = await facade.find({id:"1"});

    expect(result.id).toBe(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.street);
    expect(result.address.state).toBe(invoice.state);
    expect(result.address.number).toBe(invoice.number);
    expect(result.address.zipCode).toBe(invoice.zipCode);
    expect(result.address.city).toBe(invoice.city);
    expect(result.address.complement).toBe(invoice.complement);
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.items[0].id).toBe(invoice.items[0].id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.total).toBe(invoice.total);
    expect(result.createdAt).toBeDefined();
  });

  it("Should generate an invoice", async () => {
    const invoice = {
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
    
    const facade = InvoiceFacadeFactory.create()
    const result = await facade.generate(invoice);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.street);
    expect(result.state).toBe(invoice.state);
    expect(result.number).toBe(invoice.number);
    expect(result.zipCode).toBe(invoice.zipCode);
    expect(result.city).toBe(invoice.city);
    expect(result.complement).toBe(invoice.complement);
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.items[0].id).toBe(invoice.items[0].id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.total).toBe(invoice.total);
  });
});

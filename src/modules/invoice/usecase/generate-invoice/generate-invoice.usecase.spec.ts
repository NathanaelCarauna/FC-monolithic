import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const rawInvoice = {
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

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(rawInvoice)),
  };
};

describe("Generate invoice usecase test", () => {
  it("Should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUsecase(repository);

    const input = {
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
      total: 100
    };
    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBe(rawInvoice.id);
    expect(result.name).toBe(rawInvoice.name);
    expect(result.document).toBe(rawInvoice.document);
    expect(result.street).toBe(rawInvoice.street);
    expect(result.state).toBe(rawInvoice.state);
    expect(result.number).toBe(rawInvoice.number);
    expect(result.zipCode).toBe(rawInvoice.zipCode);
    expect(result.city).toBe(rawInvoice.city);
    expect(result.complement).toBe(rawInvoice.complement);
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(rawInvoice.items.length);
    expect(result.items[0].id).toBe(rawInvoice.items[0].id);
    expect(result.items[0].name).toBe(rawInvoice.items[0].name);
    expect(result.items[0].price).toBe(rawInvoice.items[0].price);
    expect(result.total).toBe(100);
  });
});

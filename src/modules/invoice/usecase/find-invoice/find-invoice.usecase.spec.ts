import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const address = new Address({
  state: "State",
  street: "Street",
  city: "City",
  complement: "Complemente",
  number: "1",
  zipCode: "1234",
});
const invoiceItem = new InvoiceItem({
  id: new Id("1"),
  name: "Invoice item",
  price: 100,
});
const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice",
  document: "123456",
  address: address,
  items: [invoiceItem],
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn()
  };
};

describe("Find invoice use case tests", () => {
  it("Should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUsecase(repository);

    const input = {
        id: "1"
    }

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(address.street)
    expect(result.address.state).toBe(address.state)
    expect(result.address.number).toBe(address.number)
    expect(result.address.zipCode).toBe(address.zipCode)
    expect(result.address.city).toBe(address.city)
    expect(result.address.complement).toBe(address.complement)
    expect(result.items).toBeDefined();
    expect(result.items.length).toBe(invoice.items.length)
    expect(result.items[0].id).toBe(invoiceItem.id.id)
    expect(result.items[0].name).toBe(invoiceItem.name)
    expect(result.items[0].price).toBe(invoiceItem.price)
    expect(result.total).toBe(invoice.total)
    expect(result.createdAt).toBeDefined();    
  });
});

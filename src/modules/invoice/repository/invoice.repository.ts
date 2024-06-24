import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import {
  GenerateInvoiceGatewayInputDto,
  GenerateInvoiceGatewayOutputDto,
} from "../gateway/invoice.gateway.dto";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(input: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({ where: { id: input } });
    const address = new Address({
      street: result.street,
      state: result.state,
      number: result.number,
      complement: result.complement,
      zipCode: result.zipCode,
      city: result.city,
    });
    const items = result.items.map(
      (item) =>
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        })
    );
    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: address,
      items: items,
    });
  }

  async generate(
    input: GenerateInvoiceGatewayInputDto
  ): Promise<GenerateInvoiceGatewayOutputDto> {
    await InvoiceModel.create({
      id: input.id,
      name: input.name,
      document: input.document,
      street: input.street,
      state: input.state,
      complement: input.complement,
      number: input.number,
      city: input.city,
      zipCode: input.zipCode,
      items: input.items
    });

    return {
      id: input.id,
      name: input.name,
      document: input.document,
      street: input.street,
      state: input.state,
      complement: input.complement,
      number: input.number,
      city: input.city,
      zipCode: input.zipCode,
      items: input.items,
      total: input.items.reduce((sum, item) => sum + item.price, 0)
    };
  }
}

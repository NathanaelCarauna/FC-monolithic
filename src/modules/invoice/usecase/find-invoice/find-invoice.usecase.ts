import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.usecase.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
  constructor(private repository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const result = await this.repository.find(input.id);
    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      address: new Address({
        state: result.address.state,
        street: result.address.street,
        city: result.address.city,
        number: result.address.number,
        zipCode: result.address.zipCode,
        complement: result.address.complement,
      }),
      createdAt: result.createdAt,      
      items: result.items.map(item => {
        return {
            id: item.id.id,
            name: item.name,
            price: item.price
        }
      }),
      total: result.total
    };
  }
}

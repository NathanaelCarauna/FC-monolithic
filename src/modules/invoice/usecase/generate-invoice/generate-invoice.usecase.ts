import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface{
    constructor(private repository: InvoiceGateway){}
    
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {        
            const result = await this.repository.generate({
            id: new Id().id,
            city: input.city,
            complement: input.complement,
            document: input.document,
            items: input.items,
            name: input.name,
            number: input.number,
            state: input.state,
            street: input.street,
            total: input.items.reduce((sum, iten) => sum + iten.price, 0),
            zipCode: input.zipCode,
        });
        return result
    }
}
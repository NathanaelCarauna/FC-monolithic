import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface{

    constructor(private findUsecase: UseCaseInterface, private generateUsecase: UseCaseInterface){}

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this.findUsecase.execute(input)
    }
    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this.generateUsecase.execute(input)
    }
}
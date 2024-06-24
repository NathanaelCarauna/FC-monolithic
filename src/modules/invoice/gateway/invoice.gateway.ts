import Invoice from "../domain/invoice.entity";
import { GenerateInvoiceGatewayInputDto, GenerateInvoiceGatewayOutputDto } from "./invoice.gateway.dto";


export default interface InvoiceGateway {
  find(input: string): Promise<Invoice>;
  generate(input: GenerateInvoiceGatewayInputDto): Promise<GenerateInvoiceGatewayOutputDto>;
}
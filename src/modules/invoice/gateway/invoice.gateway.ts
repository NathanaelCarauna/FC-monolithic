import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway{
    find(input: string) : Promise<Invoice>
    generate(input: Invoice) : Promise<Invoice>
}
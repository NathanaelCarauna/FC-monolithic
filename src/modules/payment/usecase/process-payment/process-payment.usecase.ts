import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import PaymentGateway from "../../gateway/payment.gateway";
import Transaction from "../../domain/transaction";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.usecase.dto";

export default class ProcessPaymentUsecase implements UseCaseInterface{

    constructor(private repository : PaymentGateway){}

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transcation = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
        });
        transcation.process();
        const persistTransaction = await this.repository.save(transcation);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: transcation.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        }

    }

}
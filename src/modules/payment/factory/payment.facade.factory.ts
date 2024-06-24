import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TranscationRepository from "../repository/transaction.repository";
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface{
        const repository = new TranscationRepository();
        const usecase = new ProcessPaymentUsecase(repository);
        const facade = new PaymentFacade(usecase);
        return facade;
    }
}
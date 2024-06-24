import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model"
import TranscationRepository from "../repository/transaction.repository"
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase"
import PaymentFacade from "./payment.facade"

describe("Payment facade test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })
        await sequelize.addModels([TransactionModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should process a transaction", async () => {
        const repository = new TranscationRepository();
        const usecase = new ProcessPaymentUsecase(repository);
        const facade = new PaymentFacade(usecase);

        const input = {
            orderId: "order-1",
            amount: 100
        }

        const result = await facade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");
    })
})
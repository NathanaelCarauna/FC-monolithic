import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1"
})

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
});

const MockRepositoryDecline = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
  };
};

describe("Process payment usecase unit test", () => {
    it("Should aprove a transcation", async () => {
        const repository = MockRepository();
        const usecase = new ProcessPaymentUsecase(repository);

        const input = {
            orderId: "1",
            amount: 100
        }

        const result = await usecase.execute(input);

        expect(repository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transaction.id.id);
        expect(result.status).toBe("approved")
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1")
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

     it("Should decline a transcation", async () => {
       const repository = MockRepositoryDecline();
       const usecase = new ProcessPaymentUsecase(repository);

       const input = {
         orderId: "1",
         amount: 50,
       };

       const result = await usecase.execute(input);

       expect(repository.save).toHaveBeenCalled();
       expect(result.transactionId).toBe(transaction2.id.id);
       expect(result.status).toBe("declined");
       expect(result.amount).toBe(50);
       expect(result.orderId).toBe("1");
       expect(result.createdAt).toBeDefined();
       expect(result.updatedAt).toBeDefined();
     });
})
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

describe("PlaceOrder usecase unit test", () => {
  describe("Execute method", () => {
    it("Should throw an error when client is not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };
      // @ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force set clientFacade
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      );
    });

    it("Should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };

      // @ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force set clientFacade
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const mockValidateProductts = jest
        //@ts-expect-error spy on private method
        .spyOn(placeOrderUsecase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("No products selected")
      );

      expect(mockValidateProductts).toHaveBeenCalled();
    });
  });

  describe("ValidadeProducts method", () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it("Should thrown an error if no products are selected", async () => {
      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("No products selected"));
    });

    it("Should throw an error when product is out of stock", async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1,
          })
        ),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUsecase["_productFacade"] = mockProductFacade;

      let input: PlaceOrderInputDto = {
        clientId: "0",
        products: [{productId: "1"}]
      }

      await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
        new Error("Product 1 is not available in stock")
      )

      input = {
        clientId: "0",
        products: [{ productId: "0" }, { productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));

      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

      input = {
        clientId: "0",
        products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not available in stock"));

      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
    });
  });
});

import express, { Request, Response } from "express";
import PlaceOrderUsecase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.facatory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/Invoice.facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import { PlaceOrderInputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const checkoutRepository = new CheckoutRepository();

  const checkoutUseCase = new PlaceOrderUsecase(
    clientFacade,
    productFacade,
    catalogFacade,
    checkoutRepository,
    invoiceFacade,
    paymentFacade
  );

  try {
    const input: PlaceOrderInputDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };
    const output = await checkoutUseCase.execute(input)
    res.status(200).send(output);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

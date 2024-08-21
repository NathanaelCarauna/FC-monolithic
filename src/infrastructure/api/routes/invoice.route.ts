import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/Invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const invoiceFacade = InvoiceFacadeFactory.create();
  try {
    const output = await invoiceFacade.find({ id: req.params.id });
    res.status(200).json(output);
  } catch (error) {
    res.status(500).send({ error: "Invoice not found or an error occurred" });
  }
});

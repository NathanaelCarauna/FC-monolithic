import express, { Request, Response } from "express";
import ClientAdmFacade from "../../../modules/client-adm/facade/client-adm.facade";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.facatory";
import Client from "../../../modules/client-adm/domain/client.entity";
import { AddClientFacadeInputDto } from "../../../modules/client-adm/facade/client-adm.facade.interface";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  try {
    const input: AddClientFacadeInputDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      city: req.body.city,
      complement: req.body.complement,
      zipCode: req.body.zipCode,
      number: req.body.number,
      state: req.body.state,
      street: req.body.street,
    };
    await clientFacade.add(input);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

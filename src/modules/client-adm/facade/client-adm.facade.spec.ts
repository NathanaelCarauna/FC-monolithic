import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.respository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.facatory";

describe("Client-adm facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    sequelize.close();
  });

  it("Should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      street: "Address 1",
      document: "doc",
      city: "city",
      complement: "complement",
      zipCode: "zip",
      number: "number",
      state: "state",
    };
    await facade.add(input);
    const result = await ClientModel.findOne({ where: { id: input.id } });

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.email).toEqual(input.email);
    expect(result.document).toEqual(input.document);
    expect(result.city).toEqual(input.city);
    expect(result.complement).toEqual(input.complement);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.number).toEqual(input.number);
    expect(result.state).toEqual(input.state);
    expect(result.street).toEqual(input.street);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it("Should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      street: "Address 1",
      document: "doc",
      city: "city",
      complement: "complement",
      zipCode: "zip",
      number: "number",
      state: "state",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await ClientModel.create(input);

    const result = await facade.find({ id: input.id });

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.email).toEqual(input.email);
    expect(result.document).toEqual(input.document);
    expect(result.city).toEqual(input.city);
    expect(result.complement).toEqual(input.complement);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.number).toEqual(input.number);
    expect(result.state).toEqual(input.state);
    expect(result.street).toEqual(input.street);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});

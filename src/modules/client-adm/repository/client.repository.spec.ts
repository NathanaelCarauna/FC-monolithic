import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.respository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository test", () => {
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
    await sequelize.close();
  });

  it("Should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      street: "Address 1",
      document: "doc",
      city: "city",
      complement: "complement",
      zipCode: "zip",
      number: "number",
      state: "state",
    });

    const repository = new ClientRepository();
    await repository.add(client);
    const result = await ClientModel.findOne({ where: { id: client.id.id } });

    expect(result.id).toEqual(client.id.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.city).toEqual(client.city);
    expect(result.complement).toEqual(client.complement);
    expect(result.zipCode).toEqual(client.zipCode);
    expect(result.number).toEqual(client.number);
    expect(result.state).toEqual(client.state);
    expect(result.street).toEqual(client.street);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it("Should find a client", async () => {
    const client = await ClientModel.create({
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
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.city).toEqual(client.city);
    expect(result.complement).toEqual(client.complement);
    expect(result.zipCode).toEqual(client.zipCode);
    expect(result.number).toEqual(client.number);
    expect(result.state).toEqual(client.state);
    expect(result.street).toEqual(client.street);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});

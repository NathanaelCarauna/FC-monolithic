import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model"
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
            sync: {force: true}
        })
        await sequelize.addModels([ClientModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        sequelize.close();
    })

    it("Should create a client", async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        }
        await facade.add(input)
        const result = await ClientModel.findOne({where: {id: input.id}});

        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

    it("Should find a client", async () => {        
        const facade = ClientAdmFacadeFactory.create();
        const input = {
          id: "1",
          name: "Client 1",
          email: "x@x.com",
          address: "Address 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await ClientModel.create(input);

        const result = await facade.find({id: input.id})

        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })
})
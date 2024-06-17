import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.respository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create() {
        const repository = new ClientRepository();
        const findUsecase = new FindClientUsecase(repository);
        const addUsecase = new AddClientUsecase(repository);
        const facade = new ClientAdmFacade({
            addClientUsecase: addUsecase,
            findClientUsecase: findUsecase
        })

        return facade;
    }
}
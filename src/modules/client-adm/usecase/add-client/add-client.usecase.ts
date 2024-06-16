import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUsecase implements UseCaseInterface {
  constructor(private _repository: ClientGateway) {}
    
  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {            
            name: input.name,
            email: input.email,
            address: input.address
        }

        const client = new Client(props)
        this._repository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }  
}

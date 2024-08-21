import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./add-client.usecase.dto";

export default class AddClientUsecase implements UseCaseInterface {
  constructor(private _repository: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id || new Id().id),
      name: input.name,
      email: input.email,
      document: input.document,
      city: input.city,
      complement: input.complement,
      zipCode: input.zipCode,
      number: input.number,
      state: input.state,
      street: input.street,
    };

    const client = new Client(props);
    this._repository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      city: client.city,
      complement: client.complement,
      zipCode: client.zipCode,
      number: client.number,
      state: client.state,
      street: client.street,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}

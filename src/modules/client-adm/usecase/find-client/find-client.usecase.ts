import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase implements UseCaseInterface {
  constructor(private _repository: ClientGateway) {}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const result = await this._repository.find(input.id);
    return {
        id: result.id.id,
        name: result.name,
        email: result.email,
        address: result.address,
        updatedAt: result.updatedAt,
        createdAt: result.createdAt,
    }
  }
}

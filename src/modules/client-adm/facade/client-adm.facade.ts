import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface useCaseProps {
  addClientUsecase: AddClientUsecase;
  findClientUsecase: FindClientUsecase;
};

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _findUsecase: UseCaseInterface;

  constructor(props: useCaseProps) {
    this._addUsecase = props.addClientUsecase;
    this._findUsecase = props.findClientUsecase;
  }
  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input);
  }
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return this._findUsecase.execute(input);
  }
}
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeOutputDto,
  FindStoreCatalogFaceInputDto,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: FindProductUsecase;
  findAllUseCase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllUseCase: FindAllProductsUsecase;
  private _findUseCase: FindProductUsecase;

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async find(
    id: FindStoreCatalogFaceInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute(id);
   
  }
  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute();
  }
}

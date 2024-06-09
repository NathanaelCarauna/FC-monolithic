import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface {
  constructor(private productRepository: ProductGateway) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const result = await this.productRepository.find(input.id);

    return {
      id: result.id.id,
      name: result.name,
      description: result.description,
      salesPrice: result.salesPrice,
    };
  }
}

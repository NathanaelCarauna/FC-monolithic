import UseCaseInterface from "../../../../@shared/domain/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;

  constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    //Buscar o cliente. Caso não encontre -> client not found
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error("Client not found");
    }

    //Validar produto
    await this.validateProducts(input);

    //Recuperar os produtos
    //Criar o objeto do client
    //Criar o objeto da order (client, products)
    //Processpayment ->
    //caso o pagamento seja aprovado -> gerar invoice
    //mudar status da ordem para approved
    //retornar DTO
    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length == 0) throw new Error("No products selected");

    for (const p of input.products){
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      })
      if(product.stock <= 0){
        throw new Error(`Product ${product.productId} is not available in stock`)
      }
    }
  }
}

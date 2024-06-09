export interface FindStoreCatalogFaceInputDto{
    id: string
}

export interface FindStoreCatalogFacadeOutputDto{
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFaceInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
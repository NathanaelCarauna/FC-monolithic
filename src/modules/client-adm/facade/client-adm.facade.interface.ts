export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  city: string;
  complement: string;
  zipCode: string;
  number: string;
  state: string;
  street: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  city: string;
  complement: string;
  zipCode: string;
  number: string;
  state: string;
  street: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}

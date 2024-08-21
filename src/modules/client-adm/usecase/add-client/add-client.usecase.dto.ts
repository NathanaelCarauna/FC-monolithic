export interface AddClientInputDto {
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

export interface AddClientOutputDto {
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

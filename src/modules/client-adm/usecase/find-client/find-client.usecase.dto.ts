export interface FindClientInputDto{
    id: string;
}

export interface FindClientOutputDto {
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
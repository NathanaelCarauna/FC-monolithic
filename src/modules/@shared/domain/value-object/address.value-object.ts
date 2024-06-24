import ValueObject from "./value-object.interface";

type addressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};
export default class Address implements ValueObject {
  private _street: string;

  private _zipCode: string;

  private _state: string;

  private _city: string;

  private _complement: string;

  private _number: string;

  constructor(props: addressProps) {
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
  }

  public get street(): string {
    return this._street;
  }
  public get zipCode(): string {
    return this._zipCode;
  }
  public get state(): string {
    return this._state;
  }
  public get city(): string {
    return this._city;
  }
  public get complement(): string {
    return this._complement;
  }
  public get number(): string {
    return this._number;
  }
}

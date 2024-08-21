import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  city: string;
  complement: string;
  zipCode: string;
  number: string;
  state: string;
  street: string;
};

export default class Client extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;
  private _document: string;
  private _city: string;
  private _complement: string;
  private _zipCode: string;
  private _number: string;
  private _state: string;
  private _street: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._document = props.document;
    this._city = props.city;
    this._complement = props.complement;
    this._zipCode = props.zipCode;
    this._number = props.number;
    this._state = props.state;
    this._street = props.street;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get document() {
    return this._document;
  }
  get city() {
    return this._city;
  }
  get complement() {
    return this._complement;
  }
  get zipCode() {
    return this._zipCode;
  }
  get number() {
    return this._number;
  }
  get state() {
    return this._state;
  }
  get street() {
    return this._street;
  }
}

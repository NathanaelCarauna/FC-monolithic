import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice-item.entity";

type invoceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
};

export default class Invoice extends BaseEntity implements AgregateRoot {
  private _name: string;

  private _document: string;

  private _items: InvoiceItem[];
  private _address: Address;

  constructor(props: invoceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._items = props.items;
    this._address = props.address;
  }

  public get name(): string {
    return this._name;
  }
  public get document(): string {
    return this._document;
  }
  public get items(): InvoiceItem[] {
    return this._items;
  }

  public get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  public get address(): Address {
    return this._address;
  }
}

import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps = {
  id: Id;
  name: string;
  price: number;
};

export default class InvoiceItem extends BaseEntity implements AgregateRoot {
  private _name: string;

  private _price: number;

  constructor(props: InvoiceItemProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
  }

  public get name(): string {
    return this._name;
  }
  public get price(): number {
    return this._price;
  }
}

import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Product extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._stock = props.stock;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get description(): string {
    return this._description;
  }

  public get purchasePrice(): number {
    return this._purchasePrice;
  }

  public set purchasePrice(value: number) {
    this._purchasePrice = value;
  }

  public get stock(): number {
    return this._stock;
  }

  public set stock(value: number) {
    this._stock = value;
  }
}

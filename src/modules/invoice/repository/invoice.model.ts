import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column
  id?: string;
  @Column({ allowNull: false })
  name: string;
  @Column({ allowNull: false })
  document: string;
  @Column({ allowNull: false })
  street: string;
  @Column({ allowNull: false })
  number: string;
  @Column({ allowNull: false })
  complement: string;
  @Column({ allowNull: false })
  city: string;
  @Column({ allowNull: false })
  state: string;
  @Column({ allowNull: false })
  zipCode: string;
  @Column({ allowNull: false, type: DataType.JSONB })
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}
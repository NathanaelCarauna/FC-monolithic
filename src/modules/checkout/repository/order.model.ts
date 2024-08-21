import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

@Table
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  id?: string;
  @Column({ allowNull: false, type: DataType.JSONB })
  client: Client;
  @Column({ allowNull: false, type: DataType.JSONB })
  products: Product[];
  @Column({ allowNull: false })
  status?: string;
  @Column({ allowNull: false })
  createdAt: Date;
  @Column({ allowNull: false })
  updatedAt: Date;
}

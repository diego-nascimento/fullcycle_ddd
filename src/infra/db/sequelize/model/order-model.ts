import { Table,Model, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import { CustomerModel } from "./customer-model";
import { OrderItemModel } from "./order-item-model";


@Table({
  tableName: 'orders',
  timestamps: false
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({primaryKey: true, unique: true})
  declare id: string

  @ForeignKey(() => CustomerModel)
  @Column({allowNull: false})
  declare customer_id: string

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]

  @Column({allowNull: false})
  declare total: number
}
import { Table,Model, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";

import { CustomerModel } from "../../../customer/repository/sequelize/customer-model";
import { OrderModel } from "./order-model";
import { ProductModel } from "../../../product/repository/sequelize/product-model";


@Table({
  tableName: 'order-items',
  timestamps: false
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column({primaryKey: true, unique: true})
  declare id: string

  @ForeignKey(() => ProductModel)
  @Column({allowNull: false})
  declare product_id: string

  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  @ForeignKey(() => OrderModel)
  @Column({allowNull: false})
  declare order: string

  @Column({allowNull: false})
  declare quantity: number

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: false}) 
  declare price: number
}
import { Order } from "../../../../domain/checkout/entities/order"
import { OrderItem } from "../../../../domain/checkout/entities/order_item"
import { order_repository_interface } from "../../../../domain/checkout/repository/order-repository-interface"
import { OrderItemModel } from "./order-item-model"
import { OrderModel } from "./order-model"





export class OrderRepository implements order_repository_interface {
  async create(entity: Order):Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customer_id,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.product_id,
        quantity: item.quantity
      }))
    }, {
      include: [{model: OrderItemModel}]
    })
  }

  async update(entity: Order): Promise<void> {
      await OrderModel.update({
        customer_id: entity.customer_id,
        total: entity.total(),
      }, {
        where: {
          id: entity.id
        }
      })

      entity.items.forEach(item => {
        OrderItemModel.update({
          name: item.name,
          price: item.price,
          product_id: item.product_id,
          quantity: item.quantity
        }, {
          where: {
            id: item.id
          }
        })
      })
   
  }

  async find(id: string): Promise<Order> {

      const orderModel = await OrderModel.findOne({
        where: {
          id
        },
        include: {
          model: OrderItemModel
        }
      })


    const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity) ) 
    
    return new Order(orderModel.id, orderModel.customer_id, orderItems)
  }

  async findAll(): Promise<Order[]> {
   const orderModels = await OrderModel.findAll({
    include: {
      model: OrderItemModel
    }
  })

   return orderModels.map(order=> {
    const items = order.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    return new Order(order.id, order.customer_id, items)
   })
  }
  
}
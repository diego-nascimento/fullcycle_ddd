import { Customer } from "../entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order_item";
import {v4 as uuid} from 'uuid'


export class OrderService {
  static total(orders: Order[]){
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }

  static placeOrder(customer: Customer, orderItens: OrderItem[]):Order{
    if(orderItens.length === 0) throw new Error('Order must have at least one item')
    const order = new Order(uuid(), customer.id, orderItens)
    customer.addRewardPoints(order.total()/2)
    return order
  }
}
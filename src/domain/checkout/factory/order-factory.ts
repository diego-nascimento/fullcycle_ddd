import { Order } from "../entities/order";
import { OrderItem } from "../entities/order_item";
import {randomUUID} from 'crypto'

interface ItemProps {
  id: string
  name: string,
  productId: string
  quantity: number
  price: number
}

interface orderFactoryProps {
  customerId: string,
  items: ItemProps[]
}

export class OrderFactory {
  public static create(orderProps: orderFactoryProps):Order{
    const items = orderProps.items.map(item => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
    })
    const order = new Order(randomUUID(), orderProps.customerId, items)
    return order
  }
}
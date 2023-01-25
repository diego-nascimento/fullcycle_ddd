

import {OrderItem} from '../entities/order_item'
import {Order} from '../entities/order'
import {Customer} from '../entities/customer'
import {OrderService} from './orderService'

describe('order service unit tests', () => {

  test('Should place a order', () => {
    const customer = new Customer('123', 'Diego')
    const Item1 = new OrderItem('i1', 'item1', 10, 'p1', 1)
    const order = OrderService.placeOrder(customer, [Item1])
    expect(customer.RewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })

  test('Should throw a error if array of itens length is equal to zero', () => {
    expect(() => {
      const customer = new Customer('123', 'Diego')
      const order = OrderService.placeOrder(customer, [])
    }).toThrowError('Order must have at least one item')
  })

  test('Should calculate the total of all orders', () => {
    const Item1 = new OrderItem('i1', 'item1', 100, 'p1', 1)
    const Item2= new OrderItem('i2', 'item1', 200, 'p2', 2)
    const order1 = new Order('123', '123', [Item1])
    const order2 = new Order('1231', '1234', [Item2])
    const total = OrderService.total([order1, order2])
    expect(total).toBe(500)
  })
})
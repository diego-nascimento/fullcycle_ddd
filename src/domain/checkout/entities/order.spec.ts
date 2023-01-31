import { Order } from "./order"
import { OrderItem } from "./order_item"

describe('Order unit tests',() => {

  test('Should throw a error when id is empty', () => {
    expect(() => {
      new Order("", '123', [])
    }).toThrowError('Id is required')
  })

  test('Should throw a error when customerId is empty', () => {
    expect(() => {
      new Order("123", '', [])
    }).toThrowError('CustomerId is required')
  })

  test('Should throw a error when item quantity equal to zero', () => {
    expect(() => {
      new Order("123", '123', [])
    }).toThrowError('Itens are required')
  })

  test('Should calculate total', () => {
    const item1 = new OrderItem('item 1', 'item 1', 100, 'p1', 2)
    const item2 = new OrderItem('item 2', 'item 2', 200, 'p2', 2)
    const order = new Order('order 1', 'customer 1', [item1, item2])

    const total = order.total()
    expect(total).toBe(600)
  })

  test('Should throw error if the item qtd is less or equal zero', () => {
  expect(() => {
    const item1 = new OrderItem('item 1', 'item 1', 100, 'p1', 0)
    new Order('order 1', 'customer 1', [item1])
  }).toThrowError('Item quantity must greater than zero')
  })
})

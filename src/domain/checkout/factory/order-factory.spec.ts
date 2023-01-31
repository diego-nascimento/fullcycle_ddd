import {randomUUID} from 'crypto'
import {OrderFactory} from './order-factory'

describe('order factory unit test', () => { 
  test('Should create an order', () => {
    const orderProps = {
      customerId: randomUUID(),
      items: [
        {
          id: randomUUID(),
          name: 'Product 1',
          productId: randomUUID(),
          quantity: 1,
          price: 100
        }
      ]
    }

    const order = OrderFactory.create(orderProps)
    expect(order.id).toBeDefined()
    expect(order.customer_id).toBe(orderProps.customerId)
    expect(order.items.length).toBe(1)
  })
 })
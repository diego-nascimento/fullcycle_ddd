import { Address } from '../value-object/address'
import {CustomerFactory} from './customer-factory'

describe('customer factory unit test',  () => {
  test('Should create a customer', () => {
    const customer = CustomerFactory.create('Customer 1')
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Customer 1')
    expect(customer.address).toBeUndefined()
  })

  test('Should create a customer with a address', () => {
    const address = new Address('rua 1', 123, '36512000', 'pirauba')
    const customer = CustomerFactory.createWithAddress('Customer 1', address)
    
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Customer 1')
    expect(customer.address).toBe(address)
  })
})
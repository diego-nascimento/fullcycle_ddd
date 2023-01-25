import { Address } from "./address"
import { Customer } from "./customer"


describe('customer',() => {
  test('Should throw a error when id is empty', () => {
    expect(() => {new Customer('', '123') }).toThrowError('Id is required')
  })

  test('Should throw a error when name is empty', () => {
    expect(() => {new Customer('123', '') }).toThrowError('Name is required')
  })

  test('Should change name', () => {
    const customer =  new Customer('123', 'JOao')

    customer.changeName('Maria')

    expect(customer.name).toBe('Maria')
  })

  test('Should activate customer', () => {
    const customer =  new Customer('123', 'Customer 1')
    const address = new Address('rua 1', 123, '36512000', 'pirauba')
    customer.setAddress(address)
    customer.activate()
    expect(customer.isActive()).toBeTruthy()
  })

  test('Should throw a error when activating customer with address undefined', () => {
    expect(() => {
      const customer =  new Customer('123', 'Customer 1')
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')
  })

  test('Should deactivate customer', () => {
    const customer =  new Customer('123', 'Customer 1')
    customer.deactivate()
    expect(customer.isActive()).toBeFalsy()
  })

  test('Should add reward points', () => {
    const customer = new Customer('123', 'Customer1')
    expect(customer.RewardPoints).toBe(0)

    customer.addRewardPoints(100)
    expect(customer.RewardPoints).toBe(100)

    customer.addRewardPoints(100)
    expect(customer.RewardPoints).toBe(200)
  })
})

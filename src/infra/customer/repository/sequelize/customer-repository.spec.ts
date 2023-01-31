import { Sequelize } from "sequelize-typescript"
import { Customer } from "../../../../domain/customer/entity/customer"
import { Address } from "../../../../domain/customer/value-object/address"
import { CustomerModel } from "./customer-model"

import {CustomerRepository} from './customer-repository'


describe('Customer repository test', () => {
  let sequelize:Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test('Should create a Customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1123", "Customer 1");
    customer.deactivate()
    customer.addRewardPoints(100)
    const address = new Address('rua 1', 1, '36170000', 'Pirauba')
    customer.setAddress(address)

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({where:{
      id: '1123'
    }});

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.RewardPoints
    });
   
  })

  test('Should update a Customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1123", "Customer 1");
    const address = new Address('rua 1', 1, '36170000', 'Pirauba')
    customer.setAddress(address)
    await customerRepository.create(customer);

    customer.changeName('Customer 2')

    await customerRepository.update(customer)

    const customerModel2 = await CustomerModel.findOne({
      where: {
        id: customer.id
      }
    })

    expect(customerModel2?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.RewardPoints
    });
    
  })

  test('Should throw if no customer is find', () => {
    const customerRepository = new CustomerRepository()
    expect(async()=> {
      await customerRepository.find('1234')
    }).rejects.toThrowError('Customer not found')

  })

  test('Should find a Customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1123", "Customer 1");
    customer.deactivate()
    customer.addRewardPoints(200)
    const address = new Address('rua 1', 1, '36170000', 'Pirauba')
    customer.setAddress(address)
    await customerRepository.create(customer);

    const foundCustomer= await customerRepository.find("1123")

    const customerModel = await CustomerModel.findOne({
      where: {
        id: customer.id
      }
    })

    expect(customerModel?.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.address.street,
      number: foundCustomer.address.number,
      zipcode: foundCustomer.address.zip,
      city: foundCustomer.address.city,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.RewardPoints
    });
  })

  test('Should find all Customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1123", "Customer2");
    const address1 = new Address('rua 12', 12, '36170000', 'Pirauba')
    customer1.setAddress(address1)
    customer1.activate()
    await customerRepository.create(customer1);

    const customer2 = new Customer("11234", "Customer2");
    const address2 = new Address('rua 12123', 12, '3617000012', 'Tocantins')
    customer2.setAddress(address2)
    customer2.deactivate()
    await customerRepository.create(customer2);

    const foundCustomers= await customerRepository.findAll()

    const customers = [customer1, customer2]

    expect(foundCustomers).toEqual(customers);
  })
})
import { Address } from "../../domain/entities/address";
import { Customer } from "../../domain/entities/customer";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository-interface";
import { CustomerModel } from "../db/sequelize/model/customer-model";



export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.RewardPoints
    })
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.RewardPoints
    }, {
      where: {
        id:entity.id
      }
    })
  }
  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id
        },
        rejectOnEmpty: true
      })
    } catch (error) {
      throw new Error('Customer not found')
    }
   
    const customer = new Customer(customerModel.id, customerModel.name)
    customer.addRewardPoints(customerModel.rewardPoints)
    if(!customerModel.active) customer.deactivate()

    customer.setAddress(new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city))
    return customer
  }
  async findAll(): Promise<Customer[]> {
    const customersModels = await CustomerModel.findAll()
    return customersModels.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name)
      customer.addRewardPoints(customerModel.rewardPoints)
      if(!customerModel.active) customer.deactivate()
      customer.setAddress(new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city))
      return customer
    })
  }
  
}
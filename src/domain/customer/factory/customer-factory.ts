import { Customer } from "../entity/customer";
import {randomUUID} from 'crypto'
import { Address } from "../value-object/address";

export class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(randomUUID(), name)
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer  = new Customer(randomUUID(), name)
    customer.setAddress(address)
    return customer
  }
}
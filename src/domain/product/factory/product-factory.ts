import { Product } from "../entities/product";
import {randomUUID} from 'crypto'
import { Product_B } from "../entities/product-b";
import { productInterface } from "../entities/product-interface";

export class ProductFactory {
  public static create(type: string, name: string, price: number):productInterface {
    switch(type){
      case 'a':
        return new Product(randomUUID(),name, price)
      case 'b':
        return new Product_B(randomUUID(), name, price)
      default: 
      throw new Error('Product type not supported')
    }
  }
}
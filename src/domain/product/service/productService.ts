import {Product} from '../entities/product'


export  class ProductService {
  static increasePrices(products: Product[], percentageAmount: number):void{
    products.forEach(product => {
      product.changePrice((product.price * percentageAmount)/100 + product.price)
    })
  }
}
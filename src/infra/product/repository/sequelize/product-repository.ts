import { Product } from "../../../../domain/product/entities/product";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository-interface";
import { ProductModel } from "./product-model";




export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    
    }, {where: {
      id: entity.id
    }})
  }
  async find(id: string): Promise<Product> {
    let productModel;
    try {
      productModel = await ProductModel.findOne({
        where: {
          id
        }
      })
    } catch (error) {
      throw new Error('Product not found')
    }
    
    return new Product(productModel.id, productModel.name, productModel.price)
  }
  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()
    return productModels.map(product => new Product(product.id, product.name, product.price))
  }
}
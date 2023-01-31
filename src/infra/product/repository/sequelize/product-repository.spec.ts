import { Sequelize } from "sequelize-typescript"
import {ProductModel} from './product-model'
import {Product} from '../../../../domain/product/entities/product'
import {ProductRepository} from './product-repository'

describe('Product repository test', () => {
  let sequelize:Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test('Should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1123", "Product 1", 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({where:{
      id: '1123'
    }});

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1123",
      name: "Product 1",
      price: 100,
    });
   
  })

  test('Should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1123", "Product 1", 100);

    await productRepository.create(product);

    product.changeName('Product 2')
    product.changePrice(200)

    productRepository.update(product)

    const productModel2 = await ProductModel.findOne({
      where: {
        id: product.id
      }
    })

    expect(productModel2?.toJSON()).toStrictEqual({
      id: "1123",
      name: "Product 2",
      price: 200,
    });
    
  })

  test('Should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1123", "Product 1", 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({
      where: {
        id: "1123"
      }
    });
    const foundProduct= await productRepository.find("1123")

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  })

  test('Should throw if no product is found', async () => {
    const productRepository = new ProductRepository();
    expect(async () => {
      await productRepository.find("1123")
    }).rejects.toThrow('Product not found')
  })


  test('Should find all product', async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1123", "Product 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("11234", "Product 2", 100);
    await productRepository.create(product2);

    const foundProducts= await productRepository.findAll()

    const products = [product1, product2]

    expect(products).toEqual(foundProducts);
  })
})
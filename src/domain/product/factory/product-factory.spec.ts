import {ProductFactory} from './product-factory'
describe('Product factory unit tests',() => {
  test('Should create a product type A', () => {
    const product = ProductFactory.create('a',  'Product 1', 10)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(10)
    expect(product.constructor.name).toBe('Product')
  })

  test('Should create a product type B', () => {
    const product = ProductFactory.create('b','Product B', 10)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(10)
    expect(product.constructor.name).toBe('Product_B')
  })

  test('Should throw if product type is invalid', () => {
    expect(() => ProductFactory.create('c','Product B', 10)).toThrowError('Product type not supported')
    
  })
})
import {Product_B} from './product-b'

describe('Product_B unit tests',() => {

  test('Should throw a error when id is empty', () => {
    expect(() => {
      new Product_B("", '123', 123)
    }).toThrowError('id is required')
  })
  test('Should throw a error when id is empty', () => {
    expect(() => {
      new Product_B("1123", '', 123)
    }).toThrowError('name is required')
  })

  test('Should throw a error when price less than zero', () => {
    expect(() => {
      new Product_B("1123", 'Product_B 1', -20)
    }).toThrowError('price must be greater than zero')
  })

  test('Should changeName', () => {
    const Product =new Product_B("1123", 'Product_B 1', 20)
    Product.changeName('Product_B 2')
    expect(Product.name).toBe('Product_B 2')
  })

  test('Should changePrice', () => {
    const Product =new Product_B("1123", 'product 1', 20)
    Product.changePrice(12123)
    expect(Product.price).toBe(12123)
    expect(Product.id).toBe('1123')
  })
})

import {Product} from './product'

describe('Product unit tests',() => {

  test('Should throw a error when id is empty', () => {
    expect(() => {
      new Product("", '123', 123)
    }).toThrowError('id is required')
  })
  test('Should throw a error when id is empty', () => {
    expect(() => {
      new Product("1123", '', 123)
    }).toThrowError('name is required')
  })

  test('Should throw a error when price less than zero', () => {
    expect(() => {
      new Product("1123", 'product 1', -20)
    }).toThrowError('price must be greater than zero')
  })

  test('Should changeName', () => {
    const product =new Product("1123", 'product 1', 20)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  test('Should changePrice', () => {
    const product =new Product("1123", 'product 1', 20)
    product.changePrice(12123)
    expect(product.price).toBe(12123)
  })
})

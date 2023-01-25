import { Sequelize } from "sequelize-typescript"
import {CustomerModel, OrderItemModel, OrderModel, ProductModel} from '../db/sequelize/model/'
import {Customer, Address, Product, OrderItem, Order} from '../../domain/entities/'
import {CustomerRepository, ProductRepository, OrderRepository} from '.'

describe('Order repository test', () => {
  let sequelize:Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test('Should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua 1', 100, '33617000', 'Poirauba')
    customer.setAddress(address)
    await customerRepository.create(customer)

    const product = new Product('123', 'Product 1', 100)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, product.id, 2)

    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id }, 
      include: ['items']
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customer_id,
      total: order.total(),
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order: order.id,
        product_id: order.items[0].product_id
      }]
    })
  })

  test('Should update a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua 1', 100, '33617000', 'Poirauba')
    customer.setAddress(address)
    await customerRepository.create(customer)

    const product = new Product('123', 'Product 1', 100)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, product.id, 2)

    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)


    const orderItem2 = new OrderItem('123', product.name, product.price, product.id, 4)

    const orderUpdated = new Order('123', customer.id, [orderItem2])


    await orderRepository.update(orderUpdated)


    const orderModel = await OrderModel.findOne({
      where: { id: orderUpdated.id }, 
      include: {
        model: OrderItemModel
      }
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customer_id,
      total: orderUpdated.total(),
      items: [{
        id: orderItem2.id,
        name: orderItem2.name,
        price: orderItem2.price,
        quantity: orderItem2.quantity,
        order: orderUpdated.id,
        product_id: orderUpdated.items[0].product_id
      }]
    })
  })


  test('Should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua 1', 100, '33617000', 'Poirauba')
    customer.setAddress(address)
    await customerRepository.create(customer)

    const product = new Product('123', 'Product 1', 100)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, product.id, 2)

    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderFound = await orderRepository.find(order.id)

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id
      },
      include: {
        model: OrderItemModel
      }
    })

    
    expect(orderModel?.toJSON()).toStrictEqual({
      id: orderFound.id,
      customer_id:orderFound.customer_id,
      total: orderFound.total(),
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        order: orderFound.id,
        price: orderItem.price,
        product_id: orderItem.product_id,
        quantity: orderItem.quantity
      }]
    })
   
  })


  test('Should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua 1', 100, '33617000', 'Poirauba')
    customer.setAddress(address)
    await customerRepository.create(customer)

    const product = new Product('123', 'Product 1', 100)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, product.id, 2)

    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const ordersFound = await orderRepository.findAll()

    expect(ordersFound).toStrictEqual([order])
   
  })

})
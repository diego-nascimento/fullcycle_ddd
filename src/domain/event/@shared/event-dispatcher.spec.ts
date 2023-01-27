import {EventDispatcher} from './event-dispatcher'
import {SendEmailWhenProductIsCreateHandler} from '../product/handler/send-email-when-product-is-created.handler'
import { ProductCreatedEvent } from '../product/product-created-event'

describe('Domain events testes', () => {
  test('Should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreateHandler()
    
    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
  })

  test('Should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreateHandler()
    
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
  })

  test('Should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreateHandler()
    
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBe(undefined)
  })

  test('Should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreateHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')
    
    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

    const productCreateEvent = new ProductCreatedEvent({
      productName: 'Product 1',
      id: '123',
      price: 123
    })

    eventDispatcher.notify(productCreateEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})
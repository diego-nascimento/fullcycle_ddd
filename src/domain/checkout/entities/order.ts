import { OrderItem } from "./order_item"

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[] = []

  constructor(id: string, customerID: string, items: OrderItem[]){
    this._id = id
    this._customerId = customerID
    this._items = items
    this.validate()
  }

  validate(){
    if(this._id === '') throw new Error('Id is required')
    if(this._customerId === '') throw new Error('CustomerId is required')
    if(this._items.length === 0) throw new Error('Itens are required')
    if(this._items.some(item => item.quantity <= 0)) throw new Error('Item quantity must greater than zero')
  }
  total():number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }

  get id (){
    return this._id
  }

  get customer_id (){
    return this._customerId
  }

  get items (){
    return this._items
  }
}
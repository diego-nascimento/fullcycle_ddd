import { EventDispatcher } from "../event/@shared/event-dispatcher"
import { EventDispatcherInterface } from "../event/@shared/event-dispatcher-interface"
import { CustomerChangeAddressEvent } from "../event/customer/customer-change-address-event"
import { CustomerCreateEvent } from "../event/customer/customer-created-event"
import { EnviaConsoleLogHandler } from "../event/customer/handlers/envia-consolelog-handler"
import { EnviaConsoleLog1Handler } from "../event/customer/handlers/send-consolelog-customer-create"
import { EnviaConsoleLog2Handler } from "../event/customer/handlers/send-consolelog-customer-create2"
import { Address } from "./address"

export class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = true
  private _rewardPoints: number = 0
  private readonly dispatcher: EventDispatcherInterface = new EventDispatcher()


  constructor(id: string,name: string){
    this._id = id
    this._name = name
    this.validate()
    this.handleCreateEvent()
  }

  validate(){
    if(this._id.length === 0) throw new Error('Id is required')
    if(this._name.length === 0) throw new Error('Name is required')
  }

  handleCreateEvent(){ 
    this.dispatcher.register('CustomerCreateEvent', new EnviaConsoleLog1Handler())
    this.dispatcher.register('CustomerCreateEvent', new EnviaConsoleLog2Handler())
    const createEvent = new CustomerCreateEvent({})
    this.dispatcher.notify(createEvent)
  }

  handleChangeAddressEvent(){
    this.dispatcher.unregisterAll()
    this.dispatcher.register('CustomerChangeAddressEvent', new EnviaConsoleLogHandler()) 
    const changeAddressEvent = new CustomerChangeAddressEvent({
      id: this._id,
      name: this._name,
      address: this._address
    })
    this.dispatcher.notify(changeAddressEvent)
  }

  changeName (name: string){
    this._name = name
    this.validate()
  }

  setAddress(address: Address){
    this._address = address
    this.handleChangeAddressEvent()
  }

  activate(){
    if(this._address === undefined) throw new Error('Address is mandatory to activate a customer')
    this._active = true
  }

  deactivate(){
    this._active = false
  }

  addRewardPoints(points: number){
    this._rewardPoints+=points
  }

  get id(){
    return this._id
  }

  get name(): string {
    return this._name
  }

  isActive() {
    return this._active
  }

  get RewardPoints(){
    return this._rewardPoints
  }

  get address(){
    return this._address
  }
}
import { Address } from "./address"

export class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = true
  private _rewardPoints: number = 0

  constructor(id: string,name: string){
    this._id = id
    this._name = name
    this.validate()
  }

  validate(){
    if(this._id.length === 0) throw new Error('Id is required')
    if(this._name.length === 0) throw new Error('Name is required')
  }

  changeName (name: string){
    this._name = name
    this.validate()
  }

  setAddress(address: Address){
    this._address = address
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
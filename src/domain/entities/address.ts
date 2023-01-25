export class Address {
  private _street: string = ''
  private _number: number = 0
  private _zip: string = ''
  private _city: string = ''

  constructor(street: string, number: number, zip: string, city: string){
    this._street = street
    this._number = number
    this._zip = zip
    this._city = city
    this.validate()
  }

  validate(){
  }

  get street(){
    return this._street
  }

  get number(){
    return this._number
  }

  get city(){
    return this._city
  }

  get zip(){
    return this._zip
  }
}
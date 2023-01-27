import { Address } from "../../entities";
import { EventInterface } from "../@shared/event-interface";

interface  eventDataInterface {
  id: string
  name:  string
  address: Address
}

export class CustomerChangeAddressEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: eventDataInterface; 

  constructor(eventData: eventDataInterface){
    this.dateTimeOccured = new Date()
    this.eventData = eventData
  }
}
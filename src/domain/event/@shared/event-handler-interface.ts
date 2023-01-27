import { EventInterface } from "./event-interface";


export interface EventHandlerInterface<t extends EventInterface = EventInterface> {
  handle(event: t):void
}
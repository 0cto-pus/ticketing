import nats, { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    //typescript ticketcreatedevent data.order gibi class içinde olmayan bir şey olursa uyaracak yani class dışı bir şey getiremeyeceğiz.
    console.log("Event data!", data);

    msg.ack();
  }
}

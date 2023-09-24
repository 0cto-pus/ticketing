import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@eettickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

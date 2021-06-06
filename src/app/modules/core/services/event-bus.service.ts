import { Injectable } from "@angular/core";
import { EventBusFunction } from "../../shared/models/event-bus-function.model";

@Injectable({
  providedIn: "root"
})
export class EventBusService {
  events: Record<string, EventBusFunction[]> = {};

  emit = (name: string, property?: any) => {
    if (name in this.events) {
      this.events[name].forEach((e) => {
        e.call(this, property);
      });
    }
  };
  connect = (name: string, callback: EventBusFunction) => {
    if (!(name in this.events)) this.events[name] = [];
    if (this.events[name].find((e) => e === callback) == null) {
      this.events[name].push(callback);
    }
  };
  disconnect = (name: string, callback: EventBusFunction) => {
    if (name in this.events) {
      let cb = this.events[name].find((e) => e === callback);
      this.events[name] = this.events[name].filter((c) => c !== cb);
    }
  };
}

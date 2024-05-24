import { IEvents } from "./events";

export abstract class Component<T> {
  protected events: IEvents;
  constructor(protected readonly container: HTMLElement, events?: IEvents) {
    this.events = events;
  }

  render(data?: Partial<T>): HTMLElement {
      Object.assign(this as object, data ?? {});
      return this.container;
  }
}
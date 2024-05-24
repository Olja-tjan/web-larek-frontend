import { Component } from "./base/component";
import { IEvents } from "./base/events";


export interface ISuccess {
  description: number;
}


export class Success extends Component<ISuccess> {
  protected _button: HTMLButtonElement;
  protected _description: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._button = container.querySelector(`.order-success__close`);
    this._description = container.querySelector(`.order-success__description`);

    this._button.addEventListener('click', () => {
      this.events.emit('basket:cleaner')
    });

  }

  set description(value: number) {
    this._description.textContent = `Списано ${value} синапсов`
  }
}
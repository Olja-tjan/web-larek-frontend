import { Component } from "./base/component";
import { IEvents } from "./base/events";


interface ISuccess {
  description: number;
}


export class Success extends Component<ISuccess> {
  protected _description: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.button = container.querySelector(`.order-success__close`);
    this._description = container.querySelector(`.order-success__description`);

    this.button.addEventListener('click', () => {
      this.events.emit('modal:close');
    });

  }

  set description(value: number) {
    this._description.textContent = `Списано ${value} синапсов`
  }
}
import { IEvents } from './base/events';
import { Form } from './common/Form';


export interface IOrder {
  address: string;
  payment: string;
}


export class Order extends Form<IOrder> {
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents
  ) {
    super(container, events);

    this._card = this.container.querySelector('[name="card"]') as HTMLButtonElement;
    this._cash = this.container.querySelector('[name="cash"]') as HTMLButtonElement;

    if (this._cash) {
      this._cash.addEventListener('click', () => {
        if (this._cash.classList.contains('button_alt-active')) {
          this._card.classList.remove('button_alt-active');
          this.events.emit('order:input');
        } else {
          this._cash.classList.add('button_alt-active');
          this.events.emit('order:input');
        }
      })
    }
    if (this._card) {
      this._card.addEventListener('click', () => {
        if (this._card.classList.contains('button_alt-active')) {
          this._cash.classList.remove('button_alt-active');
          this.events.emit('order:input');
        } else {
          this._card.classList.add('button_alt-active');
          this.events.emit('order:input');
          
        }
      })
    }
  }

}
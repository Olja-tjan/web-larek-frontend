import { IEvents } from './base/events';
import { Form } from './common/Form';


export interface IOrder {
  address: string;
  payment: string;
}


export class Order extends Form<IOrder> {
  _paymentButtons: NodeListOf<HTMLButtonElement>;

  constructor(container: HTMLFormElement, events: IEvents
  ) {
    super(container, events);

    this._paymentButtons = this.container.querySelectorAll('.button_alt');
    
    for (let button of this._paymentButtons) {
      button.addEventListener('click', () => {
        if (button.classList.contains('button_alt-active')) return;
        this._paymentButtons.forEach(btn => btn.classList.remove('button_alt-active'));
        button.classList.add('button_alt-active');
        this.events.emit('order:input', {
          field: 'payment',
          value: button.name,
        });
        this.events.emit('order:validation');
      });
    }
  }

  resetForm() {
    super.resetForm();
    this._paymentButtons.forEach(btn => btn.classList.remove('button_alt-active'));    
  }
}

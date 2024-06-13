import { Component } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';


interface IPage {
  counter: number;
  locked: boolean;
}


export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected wrapper: HTMLElement;
  protected basket: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this.wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this.basket = ensureElement<HTMLElement>('.header__basket');

    if (this.basket) {
      this.basket.addEventListener('click', () => {
        this.events.emit('basket:open');
      });
    }
  }

  set counter(value: number) {
    this._counter.textContent = String(value);
  }

  set locked(value: boolean) {
    if (value) {
      this.wrapper.classList.add('page__wrapper_locked');
    } else {
      this.wrapper.classList.remove('page__wrapper_locked');
    }
  }
}
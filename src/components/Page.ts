import { Component } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';


interface IPage {
  counter: number;
  locked: boolean;
}


export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    if (this._basket) {
      this._basket.addEventListener('click', () => {
        this.events.emit('basket:open');
      });
    }
  }

  set counter(value: number) {
    this._counter.textContent = String(value);
  }

  set locked(value: boolean) {
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}
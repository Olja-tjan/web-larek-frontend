import { Component } from './base/component';
import { IEvents } from './base/events';


interface IBasket {
  list: HTMLElement[];
  total: number;
}


export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._list = this.container.querySelector('.basket__list');
    this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if (this._button) {
      this._button.addEventListener('click', () => this.events.emit('order:open'))
    }
  }

  set total(value: number) {
    this._total.textContent = `${value} синапсов`;
  }

  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
    this._button.disabled = items.length ? false : true;
  }

  updateIndex() {
    Array.from(this._list.children).forEach((item, index) =>
      (item.querySelector(`.basket__item-index`)!.textContent = `${index + 1}`)
    );
  }

  disableButton() {
    this._button.disabled = true;
  }
}


interface IProductBasket {
  id: string;
  title: string;
  index: number;
  price: number;
}


export class ItemBasket extends Component<IProductBasket> {
  protected cardId: string;
  protected _title: HTMLElement;
  protected _index: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._title = this.container.querySelector(`.card__title`);
    this._index = this.container.querySelector(`.basket__item-index`);
    this._price = this.container.querySelector(`.card__price`);
    this._button = this.container.querySelector(`.basket__item-delete`);

    if (this._button) {
      this._button.addEventListener('click', () => {
        this.events.emit('card:delete', { card: this });
        this.container.remove();
      });
    }
  }

  set id(value: string) {
    this.cardId = value;
  }

  get id() {
    return this.cardId;
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set index(value: number) {
    this._index.textContent = String(value);
  }

  set price(value: number) {
    this._price.textContent = `${value} синапсов`;
  }
}
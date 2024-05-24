import { TCategory, IProduct } from "../types";
import { categoryMapping } from "../utils/constants";
import { Component } from "./base/component";
import { IEvents } from "./base/events";


export class Card extends Component<IProduct> {
  protected cardId: string;
  protected descriptionCardElement?: HTMLElement;
  protected imageCardElement?: HTMLImageElement;
  protected titleCardElement: HTMLElement;
  protected categoryCardElement?: HTMLElement;
  protected priceCardElement: HTMLElement;
  protected button?: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.descriptionCardElement = this.container.querySelector('.card__text')
    this.imageCardElement = this.container.querySelector('.card__image');
    this.titleCardElement = this.container.querySelector('.card__title');
    this.categoryCardElement = this.container.querySelector('.card__category');
    this.priceCardElement = this.container.querySelector('.card__price');
    this.button = this.container.querySelector('.card__button')

    if (this.button) {
      this.button.addEventListener('click', () => {
        if (this.button.textContent === 'Купить') {
          this.events.emit(`card:add`, { card: this })
        } else if (this.button.textContent === 'Убрать') {
          this.events.emit(`card:delete`, { card: this })
        }
      });
    } else {
      this.container.addEventListener('click', () =>
        this.events.emit('card:select', { card: this })
      );
    }


  }

  set id(value: string) {
    this.cardId = value;
  }

  get id() {
    return this.cardId;
  }

  set description(value: string) {
    this.descriptionCardElement.textContent = value;
  }

  set image(value: string) {
    this.imageCardElement.src = value;
  }

  set title(value: string) {
    this.titleCardElement.textContent = value;
  }

  set category(value: TCategory) {
    this.categoryCardElement.textContent = value;
    this.categoryCardElement.classList.add(categoryMapping[value]);
  }

  set price(value: number) {
    this.priceCardElement.textContent = value ? `${value} синапсов` : 'Бесценно';
    if (this.button && !value)
      this.button.disabled = true;
  }

  set selected(value: boolean) {
    if (value === false) {
      this.button.textContent = 'Купить';
    } else {
      this.button.textContent = 'Убрать';
    }
  }

}


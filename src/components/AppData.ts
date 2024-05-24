import { IAppData, IOrder, IProduct } from "../types";
import { IEvents } from "./base/events";


export class AppData implements IAppData {
  protected _cards: IProduct[];
  protected _preview: string | null;
  protected _payment: '' | 'online' | 'upon receipt';
  protected _email: string;
  protected _phone: string;
  protected _address: string;
  protected _total: number;
  protected _items: string[];
  protected _productsInBasket: IProduct[];
  productsCounter: number | null;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  set cards(cards: IProduct[]) {
    cards.map((item) => {
      item.selected = false;
    })
    this._cards = cards;
    this.events.emit('products:changed');
  }

  get cards() {
    return this._cards;
  }

  set preview(productId: string) {
    if (!productId) {
      this._preview = null;
      return;
    }
    const selectedCard = this.getCard(productId);
    if (selectedCard) {
      this._preview = productId;
      this.events.emit('card:selected')
    }
  }

  get preview () {
    return this._preview;
  }

  getCard(productId: string) {
    return this._cards.find((item) => item.id === productId)
  }

  get items() {
    return this._items;
  }
  get productsInBasket() {
    return this._productsInBasket;
  }

  get total() {
    return this._total;
  }

  set payment(value: '' | 'online' | 'upon receipt') {
    this._payment = value;
    this.events.emit('order:changed');
  }

  set address(value: string) {
    this._address = value;
    this.events.emit('order:changed');
  }

  set email(value: string) {
    this._email = value;
    this.events.emit('order:changed');
  }

  set phone(value: string) {
    this._phone = value;
    this.events.emit('order:changed');
  }

  get orderData():IOrder {
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address,
      total: this._total,
      items: this._items
    }
  }

  updateProductsInBasket() {
    this._productsInBasket = this._cards.filter(item => {
      return item.selected === true;
    })
    this.events.emit('productsBasket:changed');

    this._items = this._productsInBasket.map(item => {
      return item.id;
    })
    this.events.emit('order:changed');
  }

  selectProduct(productId: string) {
    this._cards.map(item => {
      if(item.id === productId && item.selected === false) {
        item.selected = true;
      } else if(item.id === productId && item.selected === true) {
        item.selected = false;
      }
    });
  };

  setTotal() {
    this._total = this._productsInBasket.reduce((sum, item) => {
      return sum + item.price
    }, 0);
    this.events.emit('order:changed');
  }

  сountProducts() {
    this.productsCounter = this._productsInBasket.length;
    return this.productsCounter;
  }
  
  checkValidationBasket() {
    if (this._items !== undefined && this._items.length !== 0 && this._total !== 0) {
      return true;
    } else {
      return false;
    }
  };

  checkValidationPaymentForm() {
    if (this._payment !== "" && this._address !== "") {
      return true;
    } else {
      return false;
    }
  };

  checkValidationContactsForm() {
    if (this._email !== "" && this._phone !== "") {
      return true;
    } else {
      return false;
    }
  };

}

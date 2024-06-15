import { IAppData, IOrder, IProduct } from "../types";
import { IEvents } from "./base/events";


export class AppData implements IAppData {
  protected _cards: IProduct[];
  protected _payment: string = '';
  protected _email: string = '';
  protected _phone: string = '';
  protected _address: string = '';
  protected _total: number = 0;
  protected _items: string[] = [];
  protected _productsInBasket: IProduct[];
  protected _productsCounter: number | null;
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

  set payment(value: string) {
    this._payment = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  set address(value: string) {
    this._address = value;
  }

  get cards() {
    return this._cards;
  }

  get total() {
    return this._total;
  }

  get productsInBasket() {
    return this._productsInBasket;
  }

  get productsCounter() {
    this._productsCounter = this._productsInBasket.length;
    return this._productsCounter;

  }

  get orderData(): IOrder {
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address,
      total: this._total,
      items: this._items
    }
  }
  
  resetOrderData() {
    this._items = [];
    this._total = null;
    this._address = '';
    this._email = '';
    this._phone = '';
    this._payment = '';
  }

  getCard(productId: string) {
    return this._cards.find((item) => item.id === productId)
  }

  selectProduct(productId: string) {
    this._cards.map(item => {
      if (item.id === productId && item.selected === false) {
        item.selected = true;
      } else if (item.id === productId && item.selected === true) {
        item.selected = false;
      }
    });
  }

  resetSelectProducts() {
    this._cards.forEach(item => item.selected = false)
  }

  updateProductsInBasket() {
    this._productsInBasket = this._cards.filter(item => {
      return item.selected === true;
    })

    this._items = this._productsInBasket.map(item => {
      return item.id;
    })
  }

  setTotal() {
    this._total = this._productsInBasket.reduce((sum, item) => {
      return sum + item.price
    }, 0);
  }

  checkValidationOrderForm() {
    if (this._payment !== "" && this._address !== "") {
      return true;
    } else {
      return false;
    }
  }

  checkValidationContactsForm() {
    if (this._email !== "" && this._phone !== "") {
      return true;
    } else {
      return false;
    }
  }

  validateOrderInputs() {
    if (this._payment === "" && this._address === "") {
      return "Нужно заполнить все поля";
    } else if (this._payment === "") {
      return "Нужно выбрать способ оплаты";
    } else if (this._address === "") {
      return "Нужно заполнить поле адрес доставки";
    }
  }

  validateContactsInputs() {
    if (this._email === "" && this._phone === "") {
      return "Нужно заполнить все поля";
    } else if (this._email === "") {
      return "Нужно заполнить поле email";
    } else if (this._phone === "") {
      return "Нужно заполнить поле телефон";
    }
  }
}

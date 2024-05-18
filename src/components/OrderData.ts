// import { IOrder, IOrderData, IProduct, TContactsForm, TOrderForm, TPayment } from "../types";
// import { IEvents } from "./base/events";

// // #### 2. Класс <span style="color:#993131">OrderData</span>
// // Класс отвечает за хранение и передачу данных заказа.\
// // Конструктор класса принимает экземпляр брокера событий.

// // Поля класса:

// // - `_payment: 'online' | 'upon receipt'` - способ оплаты
// // - `_email: string` - почта пользователя
// // - `_phone: string` - номер телефона пользователя
// // - `_address: string` - адресс пользователя
// // - `_total: number` - сумма товаров
// // - `_items: string[]` - массив из id заказанных товаров
// // - `products: IProduct[]` - массив товаров добавленных в корзину
// // - `amountProducts: number | null` - количество товаров в корзине
  
// // Класс предоставляет набор методов для взаимодействия с данными:

// // - `addProduct(productId: string): void` - добавляет товар в корзину
// // - `deleteProduct(productId: string): void` - удаляет товар из корзины
// // - `сountProducts(products: IProduct[]): number | null` - счётчик товаров в корзине
// // - `сountTotal(products: TProductPrice[]): number | null` - считает общую сумму заказанных товаров
// // - `checkActiveSelectButton(data: Record<keyof TPayment, 'online' | 'upon receipt'>): boolean` - проверяет активность кнопки в поле выбора при оформлении заказа
// // - `checkValidationOrderForm(data: Record<keyof TOrderForm, string>): boolean` - проверяет объект с данными пользователя для оформления заказа на валидность
// // - `checkValidationContactsForm(data: Record<keyof TContactsForm, string>): boolean` - проверяет объект с контактными данными пользователя на валидность


// export class OrderData implements IOrderData {
//   protected _payment: 'online' | 'upon receipt';
//   protected _email: string;
//   protected _phone: string;
//   protected _address: string;
//   protected _total: number | null;
//   protected _items: string[];
//   protected products: IProduct[];
//   protected productsCounter: number | null;
//   protected indexProducts: number[];
//   protected events: IEvents;

//   constructor(events: IEvents){
//     this.events = events;
//   }

//   setOrderInfo(orderData: TOrderForm) {}

//   getOrderInfo(): IOrder {
//     return {
//       payment: this._payment,
//       email: this._email,
//       phone: this._phone,
//       address: this._address,
//       total: this._total,
//       items: this._items
//     };
//   }

//   addProduct(product: IProduct){
//     this.products = [...this.products, product]
//     this.events.emit('productsBasket:changed')
//   }

//   deleteProduct(productId: string){
//     this.products = this.products.filter(item => item.id !== productId);
//     this.events.emit('productsBasket:changed');
//   }

//   сountProducts(){
//     this.productsCounter = this.products.length;
//     return this.productsCounter;
//   }

//   setIndexProducts(){
//     for (let i = 1; i <= this.productsCounter; i+=1) {
//       this.indexProducts = [...this.indexProducts, i];
//     }
//     return this.indexProducts;
//   }

//   сountTotal(){
//     this.products.map((item) => {
//       this._total += item.price })
//     return this._total;
//   }

//   checkActiveSelectButton(data: Record<keyof TPayment, 'online' | 'upon receipt'>){
//     return true
//   }

//   checkValidationOrderForm(data: Record<keyof TOrderForm, string>){
//     return true
//   }

//   checkValidationContactsForm(data: Record<keyof TContactsForm, string>){
//     return true
//   }
// }

// // *Список всех событий, которые могут генерироваться в системе:*\
// // *События изменения данных (генерируются классами моделями данных)*
// // - `products:changed` - изменение массива карточек товаров
// // - `order:changed` - изменение данных заказа
// // - `productsBasket:changed` - изменение массива карточек товаров в корзине
// // - `card:selected` - изменение открываемой в модальном окне карточки товара
// // - `card:previewClear` - необходима очистка данных выбранной для показа в модальном окне карточки товара
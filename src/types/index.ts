export interface IProduct {
  id: string;
  description?: string;
  image?: string;
  title?: string;
  category?: string;
  price: number;
  selected?: boolean;
}

export interface IOrder {
  payment: '' | 'online' | 'upon receipt';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IData {
  cards: IProduct[];
  preview: string | null;
  payment: '' | 'online' | 'upon receipt';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
  productsInBasket: IProduct[];
  productsCounter: number | null;
  indexProducts: number[];
  getCard(cardId: string): IProduct;
  updateProductsInBasket(): void;
  selectProduct(productId: string): void;
  setTotal(): void;
  сountProducts(): number | null;
  setIndexProducts(): number[];
  checkValidationBasket(): boolean;
  checkValidationPaymentForm(): boolean;
  checkValidationContactsForm(): boolean;
}


// export interface ICardsData {
//   cards: IProduct[];
//   preview: string | null;
//   getCard(cardId: string): IProduct;
// }

// export interface IOrderData {
//   payment: 'online' | 'upon receipt';
//   email: string;
//   phone: string;
//   address: string;
//   total: number | null;
//   items: string[];
//   products: IProduct[];
//   productsCounter: number | null;
//   indexProducts: number[];
//   addProduct(product: IProduct): void;
//   deleteProduct(productId: string): void;
//   сountProducts(): number | null;
//   setIndexProducts(): number[];
//   сountTotal(): number | null;
//   // checkActiveSelectButton(data: Record<keyof TPayment, 'online' | 'upon receipt'>): boolean;
//   // checkValidationOrderForm(data: Record<keyof TOrderForm, string>): boolean;
//   // checkValidationContactsForm(data: Record<keyof TContactsForm, string>): boolean;
// }

// export type TBasket = Pick<IOrder, 'items' | 'total'>;

// export type TPayment = Pick<IOrder, 'payment' | 'address'>;

// export type TContactsForm = Pick<IOrder, 'email' | 'phone'>;

import { EventEmitter } from './../components/base/events';
export interface IProduct {
  id: string;
  description?: string;
  image?: string;
  title?: string;
  category?: string;
  price: number;
}

export interface IOrder {
  payment: 'online' | 'upon receipt';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface ICardsData {
  cards: IProduct[];
  preview: string | null;
  getCard(cardId: string): IProduct;
}

export interface IOrderData {
  payment: 'online' | 'upon receipt';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
  products: TProducts[];
  amountProducts: number | null;
  addProduct(productId: string): void;
  deleteProduct(productId: string): void;
  сountProducts(products: TProducts[]): number | null;
  сountTotal(products: TProductPrice[]): number | null;
  checkActiveSelectButton(data: Record<keyof TPayment, 'online' | 'upon receipt'>): boolean;
  checkValidationOrderForm(data: Record<keyof TOrderForm, string>): boolean;
  checkValidationContactsForm(data: Record<keyof TContactsForm, string>): boolean;
}

export type TProducts = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TProductPrice = Pick<IProduct, 'price'>;

export type TOrderForm = Pick<IOrder, 'address'>;

export type TPayment = Pick<IOrder, 'payment'>;

export type TContactsForm = Pick<IOrder, 'email' | 'phone'>;

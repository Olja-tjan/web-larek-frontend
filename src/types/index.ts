export interface IDataServer<T> {
  total: number,
  items: T[]
}

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

export interface IAppData {
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
  getCard(productId: string): IProduct;
  updateProductsInBasket(): void;
  selectProduct(productId: string): void;
  setTotal(): void;
  сountProducts(): number | null;
  checkValidationBasket(): boolean;
  checkValidationPaymentForm(): boolean;
  checkValidationContactsForm(): boolean;
}

export type ApiPostMethods = 'POST';

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TCategory =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

export type TCategoryMapping = {
  [Key in TCategory]: string;
};

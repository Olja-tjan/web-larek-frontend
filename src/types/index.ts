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
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IAppData {
  cards: IProduct[];
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  productsInBasket: IProduct[];
  productsCounter: number | null;
  orderData: IOrder;
  resetOrderData(): void;
  getCard(productId: string): IProduct;
  selectProduct(productId: string): void;
  resetSelectProducts(): void;
  updateProductsInBasket(): void;
  setTotal(): void;
  checkValidationOrderForm(): boolean;
  checkValidationContactsForm(): boolean;
  validateOrderInputs(): string;
  validateContactsInputs(): string;
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

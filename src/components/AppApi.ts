import { IApi, IDataServer, IOrder, IProduct } from '../types';

export class AppApi {
	private _baseApi: IApi;
	private _cdn: string;

	constructor(baseApi: IApi, cdn: string) {
		this._baseApi = baseApi;
		this._cdn = cdn;
	}

	getCards(): Promise<IProduct[]> {
		return this._baseApi.get<IDataServer<IProduct>>(`/product/`).then((res: IDataServer<IProduct>) => 
			res.items.map((item) => ({
				...item,
				image: this._cdn + item.image,
			}))
		);
	}

	getImage(urlElement: string): Promise<any> {
		return this._baseApi.get<any>(`${urlElement}`).then((res: any) => res);
	}

	setOrderInfo(data: IOrder): Promise<IOrder> {
		return this._baseApi.post<IOrder>(`/order`, data, 'POST').then((res: IOrder) => res);
	}
}

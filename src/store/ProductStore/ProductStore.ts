import { action, computed, makeObservable, observable } from 'mobx';
import Api, { QueryParams } from 'config/Api';
import { IProduct } from 'entities/product/types.ts';

type PrivateFields = '_products' | '_total';

export interface IProductParams {
  limit?: number;
  page?: number;
  title?: string;
  categoryId?: number;
}

class ProductStore {
  private _products: IProduct[] = [];
  private _total: number = 1;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable,
      _total: observable,
      updateProducts: action,
      filterProducts: action,
      products: computed,
    });
  }

  public updateProducts = async (queryParams: QueryParams = {}) => {
    try {
      const res = await Api.getProducts([], queryParams);
      this.products = res.data;
    } catch (error) {
      console.error('Error on get products:', error);
    }
  };

  public updateTotal = async ({ title, categoryId }: IProductParams) => {
    const queryParams: QueryParams = {};
    if (title) {
      queryParams.title = title;
    }
    if (categoryId) {
      queryParams.categoryId = categoryId.toString();
    }
    try {
      const res = await Api.getProducts([], queryParams);
      this._total = res.data.length;
    } catch (error) {
      console.error('Error on get total:', error);
    }
  };

  public filterProducts = async ({ limit, page = 1, title, categoryId }: IProductParams) => {
    const queryParams: QueryParams = {};
    this.products = [];

    if (limit) {
      const offset = (page - 1) * limit;

      queryParams.limit = limit.toString();
      queryParams.offset = offset.toString();
    }
    if (title) {
      queryParams.title = title;
    }
    if (categoryId) {
      queryParams.categoryId = categoryId.toString();
    }

    await this.updateProducts(queryParams);
  };

  public get products(): IProduct[] {
    return this._products;
  }

  public get total(): number {
    return this._total;
  }

  public set products(value: IProduct[]) {
    this._products = value;
  }

  public reset() {
    this.products = [];
  }
}

const productStore = new ProductStore();
export default productStore;

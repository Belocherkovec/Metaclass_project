import { action, computed, makeObservable, observable } from 'mobx';
import Api, { QueryParams } from 'config/Api';
import { ICategory } from 'entities/category/types';
import { IProduct } from 'entities/product/types';

type PrivateFields = '_products' | '_total' | '_categories';

export interface IProductParams {
  limit?: number;
  page?: number;
  title?: string;
  categoryId?: string;
}

class ProductStore {
  private _products: IProduct[] = [];
  private _total: number = 1;
  private _categories: ICategory[] = [];

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable,
      _total: observable,
      _categories: observable,
      updateProducts: action,
      updateCategories: action,
      filterProducts: action,
      products: computed,
    });
  }

  public async updateProducts(queryParams: QueryParams = {}) {
    try {
      const res = await Api.getProducts([], queryParams);
      this.products = res.data;
    } catch (error) {
      console.error('Error on get products:', error);
    }
  }

  public async updateCategories(queryParams: QueryParams = {}) {
    try {
      const res = await Api.getCategories([], queryParams);
      this.categories = res.data;
    } catch (error) {
      console.error('Error on get categories:', error);
    }
  }

  public async updateTotal({ title, categoryId }: IProductParams) {
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
  }

  public async filterProducts({ limit, page = 1, title, categoryId }: IProductParams) {
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
      queryParams.categoryId = categoryId;
    }

    await this.updateProducts(queryParams);
  }

  public get products(): IProduct[] {
    return this._products;
  }

  public get categories(): ICategory[] {
    return this._categories;
  }

  public get categoryOptions(): Record<string, string> {
    const result: Record<string, string> = {};
    this._categories.forEach((c) => (result[c.id] = c.name));
    return result;
  }

  public get total(): number {
    return this._total;
  }

  public set products(value: IProduct[]) {
    this._products = value;
  }

  public set categories(value: ICategory[]) {
    this._categories = value;
  }

  public reset() {
    this.products = [];
  }
}

const productStore = new ProductStore();
export default productStore;

import { IProduct } from 'entities/product/types.ts';
import { action, computed, makeObservable, observable } from 'mobx';
import Api from 'config/Api';

type PrivateFields = '_products';

export interface IProductParams {
  categories: string[];
  title: string;
  page: number;
}

class ProductStore {
  private _products: IProduct[] = [];

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable,
      updateProducts: action,
      products: computed,
    });
  }

  public updateProducts = async () => {
    try {
      const res = await Api.getProducts();
      this.products = res.data;
    } catch (error) {
      console.error('Error on get products:', error);
    }
  };

  // public filterProducts = async (params) => {};

  public get products(): IProduct[] {
    return this._products;
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

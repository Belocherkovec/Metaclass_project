import { IProduct } from 'entities/product/types.ts';
import { action, makeObservable, observable } from 'mobx';
import Api from 'config/Api';

type PrivateFields = '_products';

export default class ProductStore {
  private _products: IProduct[] = [];

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable,
      updateProducts: action,
    });
  }

  updateProducts = async () => {
    try {
      const res = await Api.getProducts();
      this._products = res.data;
    } catch (error) {
      console.error('Error on get products:', error);
    }
  };

  get products(): IProduct[] {
    return this._products;
  }
}

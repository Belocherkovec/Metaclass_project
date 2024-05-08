import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore.ts';

type PrivateFields = '_page' | '_total';

export type PaginationElement = {
  content: string | number;
  isActive?: boolean;
  isDisabled?: boolean;
};

class PaginationStore implements ILocalStore {
  private _page: number = 1;
  private _total: number = 1;

  constructor() {
    makeObservable<PaginationStore, PrivateFields>(this, {
      _page: observable,
      _total: observable,
      incrementPage: action,
      decrementPage: action,
      goToPage: action,
      total: computed,
      page: computed,
    });
  }

  public incrementPage = () => {
    this._page++;
  };
  public decrementPage = () => {
    this._page--;
  };
  public goToPage(page: number) {
    this.page = page;
  }

  public set total(value: number) {
    this._total = value;
  }
  public get total(): number {
    return this._total;
  }

  public set page(value: number) {
    this._page = value;
  }
  public get page(): number {
    return this._page;
  }

  public get pagination(): PaginationElement[] {
    const result: PaginationElement[] = [];

    if (this._total < 6) {
      for (let i = 1; i <= this._total; i++) {
        result.push({ content: i, isActive: i === this._page });
      }
    } else {
      result.push({ content: this._page, isActive: true });
      if (this._total - this._page < 3) {
        for (let i = this._page; i < this._total; i++) {
          result.push({ content: i + 1 });
        }
        for (let i = 1; result.length < 5; i++) {
          result.unshift({ content: this._page - i });
        }
      } else {
        result.push({ content: this._page + 1 });
        if (this._page > 1) {
          result.unshift({ content: this._page - 1 });
        } else {
          result.push({ content: this._page + 2 });
        }
        result.push({ content: '...', isDisabled: true });
        result.push({ content: this._total });
      }
    }

    return result;
  }

  public destroy() {
    this._page = 1;
    this._total = 1;
  }
}

export default PaginationStore;

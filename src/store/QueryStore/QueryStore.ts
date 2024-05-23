import { makeObservable, observable, action, computed } from 'mobx';
import { NavigateFunction, Location as RouterLocation } from 'react-router-dom';
import { QueryParams } from 'config/Api';

type PrivateFields = '_navigate' | '_location';

interface LocationState {
  from?: string;
  data?: number;
}
interface Location extends RouterLocation {
  state: LocationState;
}

class QueryStore {
  private _navigate: NavigateFunction | null = null;
  private _location: Location | null = null;

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _navigate: observable,
      _location: observable,
      queryParams: computed,
      getQueryParam: action,
      setQueryParam: action,
      setRouter: action,
    });
  }

  public setRouter(navigate: NavigateFunction, location: Location): void {
    this._navigate = navigate;
    this._location = location;
  }

  get queryParams(): QueryParams {
    const searchParams = new URLSearchParams(this._location?.search);
    const params: QueryParams = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }

  public getQueryParam(param: string): string | null {
    if (!this._location) return null;
    const searchParams = new URLSearchParams(this._location.search);
    return searchParams.get(param);
  }

  public setQueryParam(param: string, value?: string): void {
    if (!this._location || !this._navigate) return;
    const searchParams = new URLSearchParams(this._location.search);
    if (value) {
      searchParams.set(param, value);
    } else {
      searchParams.delete(param);
    }
    this._navigate({
      pathname: this._location.pathname,
      search: searchParams.toString(),
    });
  }
}

const queryStore = new QueryStore();
export default queryStore;

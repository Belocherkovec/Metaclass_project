import BaseApi, { ServerConfig } from './baseApi';

export type UrlParams = string[];
export type QueryParams = { [key: string]: string };

class Api extends BaseApi {
  constructor({ baseURL, headers }: ServerConfig) {
    super({ baseURL, headers });
  }
  public async getProducts(urlParams?: UrlParams, queryParams?: QueryParams) {
    return this.getRequest('products', urlParams, queryParams);
  }
  public async getCategories(urlParams?: UrlParams, queryParams?: QueryParams) {
    return this.getRequest('categories', urlParams, queryParams);
  }
}

const URLS = {
  Platzi: 'https://api.escuelajs.co/api/v1/',
};

export default new Api({ baseURL: URLS.Platzi });

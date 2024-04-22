import BaseApi, { ServerConfig } from './baseApi';

class Api extends BaseApi {
  constructor({ baseURL, headers }: ServerConfig) {
    super({ baseURL, headers });
  }
  public async getProducts() {
    return this.getRequest('api/v1/products');
  }
}

const URLS = {
  Platzi: 'https://api.escuelajs.co/',
};

export default new Api({ baseURL: URLS.Platzi });

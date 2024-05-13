import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface ServerConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

// Определяем типы для параметров urlParams и queryParams
type UrlParams = string[];
type QueryParams = Record<string, any>;

type GetMethod = (url: string, urlParams?: UrlParams, queryParams?: QueryParams) => Promise<AxiosResponse>;

export default abstract class BaseApi {
  private server: AxiosInstance;

  constructor({ baseURL, headers = { 'Access-Control-Allow-Origin': '*' } }: ServerConfig) {
    this.server = axios.create({
      baseURL,
      headers,
    });
  }

  // Типизируем метод get
  public getRequest: GetMethod = async (url, urlParams?, queryParams?) => {
    const response = await this.server.get(this.buildUrl(url, urlParams, queryParams));
    return response;
  };

  // Метод для построения URL с учетом параметров
  private buildUrl(url: string, urlParams?: UrlParams, queryParams?: QueryParams): string {
    if (urlParams) {
      url += '/' + urlParams.join('/');
    }
    if (queryParams) {
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      url += '?' + queryString;
    }
    return url;
  }
}

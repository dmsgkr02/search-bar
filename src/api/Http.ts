import { HEADER_FETCH_DATE, EXPIRE_TIME_ONE_MINUTES } from '../constant';
import { CacheStorage } from './CacheStorage';

class HttpClient {
  private baseUrl: string | undefined;
  private cacheStorage: CacheStorage;

  constructor(baseUrl: string | undefined, cacheStorage: CacheStorage) {
    this.baseUrl = baseUrl;
    this.cacheStorage = cacheStorage;
  }

  async getDataByQuery(query: string) {
    this.cacheStorage.open();

    return await this.getValidResponse(query);
  }

  private async getValidResponse(query: string) {
    const cacheResponse = await this.cacheStorage.match(query);

    return cacheResponse && this.isCacheValid(cacheResponse)
      ? await cacheResponse.json()
      : await this.getFetchResponse(query);
  }

  private async getFetchResponse(query: string) {
    const response = await fetch(`${this.baseUrl}/${this.cacheStorage.name}?q=${query}`);
    const newResponse = await this.getResponseWithDate(response);
    this.cacheStorage.set(query, newResponse);

    console.info('calling  api');
    return response.json();
  }

  private async getResponseWithDate(response: Response) {
    const cloneResponse = response.clone();
    const newBody = await cloneResponse.blob();
    const newHeaders = new Headers(cloneResponse.headers);
    newHeaders.append(HEADER_FETCH_DATE, new Date().toISOString());

    return new Response(newBody, {
      status: cloneResponse.status,
      statusText: cloneResponse.statusText,
      headers: newHeaders,
    });
  }

  private isCacheValid(response: Response) {
    const fetchDate = new Date(response.headers.get(HEADER_FETCH_DATE)!).getTime();
    const now = new Date().getTime();

    return now - fetchDate < EXPIRE_TIME_ONE_MINUTES;
  }
}

export const httpClient = new HttpClient(process.env.REACT_APP_BASE_URL, new CacheStorage('sick'));

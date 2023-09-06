const HEADER_FETCH_DATE = 'fetch-date';
const MILLISECONDS = 1000;
const MINUTES = 60;
const EXPIRE_TIME = MILLISECONDS * MINUTES;

class CacheApiServer {
  private cacheStorageName: string;
  private baseUrl: string | undefined;

  constructor(cacheStorageName: string, baseUrl: string | undefined) {
    this.cacheStorageName = cacheStorageName;
    this.baseUrl = baseUrl;
  }

  async getDataByQuery(query: string) {
    const cache = await caches.open(this.cacheStorageName);

    return await this.getValidResponse(cache, query);
  }

  private async getValidResponse(cache: Cache, query: string) {
    const cacheResponse = await cache.match(query);

    return cacheResponse && this.isCacheValid(cacheResponse)
      ? await cacheResponse.json()
      : await this.getFetchResponse(cache, query);
  }

  private async getFetchResponse(cache: Cache, query: string) {
    const response = await fetch(`${this.baseUrl}/${this.cacheStorageName}?q=${query}`);
    const newResponse = await this.getResponseWithDate(response);
    cache.put(query, newResponse);

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

    return now - fetchDate < EXPIRE_TIME;
  }
}

export const cacheApiServer = new CacheApiServer('sick', process.env.REACT_APP_BASE_URL);

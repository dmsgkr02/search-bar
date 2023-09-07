interface StorageInterface {
  name: string;
  open(): void;
  match(key: string): void;
  set(key: string, respnse: Response): void;
  delete(key: string): void;
}

export class CacheStorage implements StorageInterface {
  name: string;
  private cache!: Cache;

  constructor(name: string) {
    this.name = name;
    this.open();
  }

  async open() {
    this.cache = await caches.open(this.name);
  }

  async match(key: string) {
    return await this.cache.match(key);
  }

  async set(key: string, respnse: Response) {
    this.cache.put(key, respnse);
  }

  async delete(key: string) {
    this.cache.delete(key);
  }
}

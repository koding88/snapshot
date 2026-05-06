interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const CACHE_KEYS = {
  GALLERIES: "cache_galleries_data",
  SITE_SETTINGS: "cache_site_settings_data",
} as const;

const GALLERIES_TTL = 1000 * 60 * 60; // 1 hour
const SITE_SETTINGS_TTL = 1000 * 60 * 60 * 3; // 3 hours

class CacheManager {
  private storage: Storage | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.storage = window.localStorage;
    }
  }

  private getEntry<T>(key: string): CacheEntry<T> | null {
    if (!this.storage) return null;

    const raw = this.storage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as CacheEntry<T>;
    } catch {
      return null;
    }
  }

  private isValid(key: string, ttl: number): boolean {
    const entry = this.getEntry(key);
    if (!entry) return false;
    return Date.now() - entry.timestamp < ttl;
  }

  private setEntry<T>(key: string, data: T): void {
    if (!this.storage) return;

    const entry: CacheEntry<T> = {
      timestamp: Date.now(),
      data,
    };

    this.storage.setItem(key, JSON.stringify(entry));
  }

  private getValidData<T>(key: string, ttl: number): T | null {
    if (!this.isValid(key, ttl)) return null;
    return this.getEntry<T>(key)?.data ?? null;
  }

  shouldFetchGalleries(): boolean {
    return !this.isValid(CACHE_KEYS.GALLERIES, GALLERIES_TTL);
  }

  setGalleriesData<T>(data: T): void {
    this.setEntry(CACHE_KEYS.GALLERIES, data);
  }

  getGalleriesData<T>(): T | null {
    return this.getValidData<T>(CACHE_KEYS.GALLERIES, GALLERIES_TTL);
  }

  shouldFetchSiteSettings(): boolean {
    return !this.isValid(CACHE_KEYS.SITE_SETTINGS, SITE_SETTINGS_TTL);
  }

  setSiteSettingsData<T>(data: T): void {
    this.setEntry(CACHE_KEYS.SITE_SETTINGS, data);
  }

  getSiteSettingsData<T>(): T | null {
    return this.getValidData<T>(CACHE_KEYS.SITE_SETTINGS, SITE_SETTINGS_TTL);
  }

  clearAll(): void {
    if (!this.storage) return;
    this.storage.removeItem(CACHE_KEYS.GALLERIES);
    this.storage.removeItem(CACHE_KEYS.SITE_SETTINGS);
  }
}

export const cacheManager = new CacheManager();

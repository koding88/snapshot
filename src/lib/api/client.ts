import axios, { type AxiosRequestConfig } from 'axios';
import { getCurrentLocale } from './locale';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://snaphanoi-be-latest.onrender.com';


export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptor to set Accept-Language dynamically
axiosClient.interceptors.request.use((config) => {
  const locale = getCurrentLocale();
  config.headers = config.headers || {};
  config.headers['Accept-Language'] = locale;
  return config;
});

type RequestOptions = AxiosRequestConfig & {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
};

export async function apiClient<T>(
  endpoint: string,
  { body, ...config }: RequestOptions = {}
): Promise<T> {
  const { data } = await axiosClient.request<T>({
    url: endpoint,
    data: body,
    ...config,
  });
  return data;
}

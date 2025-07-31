import { AxiosRequestConfig } from 'axios';

export interface HttpError {
  message: string;
  status?: number;
  code?: string;
  data?: unknown;
}

export interface RequestConfig extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
}

export interface HttpClientInterface {
  get<T>(_url: string, _config?: RequestConfig): Promise<T>;
  setHeader(_key: string, _value: string): void;
  removeHeader(_key: string): void;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestConfig, HttpClientInterface } from '@/types/http';
import { HttpErrorHandler, HttpClientError } from './httpErrorHandler';

export class HttpClient implements HttpClientInterface {
  private client: AxiosInstance;
  private defaultRetries: number = 3;
  private defaultRetryDelay: number = 1000;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      ...config,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(HttpErrorHandler.handle(error));
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('❌ Response Error:', error.response?.status, error.config?.url);
        return Promise.reject(HttpErrorHandler.handle(error));
      }
    );
  }

  private async retryRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    retries: number = this.defaultRetries,
    delay: number = this.defaultRetryDelay
  ): Promise<T> {
    let lastError: HttpClientError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await requestFn();
        return response.data;
      } catch (error) {
        lastError = error as HttpClientError;

        if (attempt === retries) {
          throw lastError;
        }

        if (lastError.status && lastError.status >= 400 && lastError.status < 500) {
          throw lastError;
        }

        console.warn(`🔄 Retry attempt ${attempt + 1}/${retries} after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }

    throw lastError!;
  }

  public async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const { retries, retryDelay, ...axiosConfig } = config || {};

    return this.retryRequest(() => this.client.get<T>(url, axiosConfig), retries, retryDelay);
  }

  public setHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string): void {
    delete this.client.defaults.headers.common[key];
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rickandmortyapi.com/api';

let clientInstance: HttpClient | null = null;

export const getHttpClient = (): HttpClient => {
  if (!clientInstance) {
    clientInstance = new HttpClient(API_BASE_URL);
  }
  return clientInstance;
};

export const httpClient = getHttpClient();

export default httpClient;

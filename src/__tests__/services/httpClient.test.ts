interface MockAxiosInstance {
  get: jest.MockedFunction<
    (_url: string, _config?: Record<string, unknown>) => Promise<{ data: unknown }>
  >;
  defaults: {
    headers: {
      common: Record<string, string>;
    };
  };
  interceptors: {
    request: {
      use: jest.MockedFunction<
        (
          _onFulfilled?: (_value: unknown) => unknown,
          _onRejected?: (_error: unknown) => unknown
        ) => void
      >;
    };
    response: {
      use: jest.MockedFunction<
        (
          _onFulfilled?: (_value: unknown) => unknown,
          _onRejected?: (_error: unknown) => unknown
        ) => void
      >;
    };
  };
}

const mockAxiosInstance: MockAxiosInstance = {
  get: jest.fn(),
  defaults: {
    headers: {
      common: {} as Record<string, string>,
    },
  },
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
}));

const mockHandle = jest.fn<Error, [Error]>();

class MockHttpClientError extends Error {
  status?: number;
  constructor({ message, status }: { message: string; status?: number }) {
    super(message);
    this.status = status;
    this.name = 'HttpClientError';
  }
}

jest.mock('../../services/httpErrorHandler', () => ({
  HttpErrorHandler: {
    handle: mockHandle,
  },
  HttpClientError: MockHttpClientError,
}));

import axios from 'axios';
import type { HttpClient as HttpClientType } from '../../services/httpClient';
import type { HttpClientError as HttpClientErrorType } from '../../services/httpErrorHandler';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockAxiosCreate = mockedAxios.create as jest.MockedFunction<typeof axios.create>;

type HttpClientConstructor = new (
  _baseURL: string,
  _config?: Record<string, unknown>
) => HttpClientType;
type HttpClientErrorConstructor = new (_params: {
  message: string;
  status?: number;
}) => HttpClientErrorType;

describe('HttpClient', () => {
  let HttpClient: HttpClientConstructor;
  let HttpClientError: HttpClientErrorConstructor;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockAxiosCreate.mockReturnValue(mockAxiosInstance as never);

    const httpClientModule = await import('../../services/httpClient');
    const httpErrorModule = await import('../../services/httpErrorHandler');
    HttpClient = httpClientModule.HttpClient as HttpClientConstructor;
    HttpClientError = httpErrorModule.HttpClientError as HttpClientErrorConstructor;
  });

  describe('constructor', () => {
    it('should create axios instance with correct config', () => {
      new HttpClient('https://api.test.com');

      expect(mockAxiosCreate).toHaveBeenCalledWith({
        baseURL: 'https://api.test.com',
        timeout: 10000,
      });
    });

    it('should setup interceptors', () => {
      new HttpClient('https://api.test.com');

      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });

    it('should accept additional config', () => {
      const customConfig = { timeout: 5000, headers: { Custom: 'header' } };

      new HttpClient('https://api.test.com', customConfig);

      expect(mockAxiosCreate).toHaveBeenCalledWith({
        baseURL: 'https://api.test.com',
        timeout: 5000,
        headers: { Custom: 'header' },
      });
    });
  });

  describe('HTTP Methods', () => {
    let httpClient: HttpClientType;
    const mockData = { id: 1, name: 'test' };

    beforeEach(() => {
      httpClient = new HttpClient('https://api.test.com');
    });

    describe('get', () => {
      it('should make GET request and return data', async () => {
        mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

        const result = await httpClient.get('/test');

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', {});
        expect(result).toEqual(mockData);
      });

      it('should pass config to axios', async () => {
        mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });
        const config = { headers: { Custom: 'header' } };

        await httpClient.get('/test', config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', config);
      });

      it('should handle retries and retry delay config', async () => {
        mockAxiosInstance.get.mockResolvedValueOnce({ data: mockData });
        const config = { retries: 5, retryDelay: 2000, headers: { Custom: 'header' } };

        await httpClient.get('/test', config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', {
          headers: { Custom: 'header' },
        });
      });
    });
  });

  describe('retry mechanism', () => {
    let httpClient: HttpClientType;

    beforeEach(() => {
      httpClient = new HttpClient('https://api.test.com');
    });

    it('should retry on server errors', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ data: { success: true } });

      const result = await httpClient.get('/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(3);
      expect(result).toEqual({ success: true });
    });

    it('should respect custom retry count', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ data: { success: true } });

      const result = await httpClient.get('/test', { retries: 1 });

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true });
    });

    it('should not retry on client errors (4xx)', async () => {
      const error = new HttpClientError({ message: 'Bad Request', status: 400 });

      mockAxiosInstance.get.mockRejectedValueOnce(error);

      await expect(httpClient.get('/test')).rejects.toThrow();
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
    });

    it('should throw error after max retries', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error);

      await expect(httpClient.get('/test')).rejects.toThrow('Server Error');
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(4);
    });

    it('should use custom retry delay', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ data: { success: true } });

      jest.spyOn(global, 'setTimeout').mockImplementation(((callback: () => void) => {
        callback();
        return {} as NodeJS.Timeout;
      }) as typeof setTimeout);

      await httpClient.get('/test', { retries: 1, retryDelay: 500 });

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);

      jest.restoreAllMocks();
    });

    it('should exponentially increase delay between retries', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ data: { success: true } });

      const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((
        callback: () => void
      ) => {
        callback();
        return {} as NodeJS.Timeout;
      }) as typeof setTimeout);

      await httpClient.get('/test', { retries: 2, retryDelay: 100 });

      expect(setTimeoutSpy).toHaveBeenNthCalledWith(1, expect.any(Function), 100);
      expect(setTimeoutSpy).toHaveBeenNthCalledWith(2, expect.any(Function), 200);

      jest.restoreAllMocks();
    });

    it('should log retry attempts', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ data: { success: true } });

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      jest.spyOn(global, 'setTimeout').mockImplementation(((callback: () => void) => {
        callback();
        return {} as NodeJS.Timeout;
      }) as typeof setTimeout);

      await httpClient.get('/test', { retries: 1 });

      expect(consoleSpy).toHaveBeenCalledWith('🔄 Retry attempt 1/1 after 1000ms');

      consoleSpy.mockRestore();
      jest.restoreAllMocks();
    });

    it('should handle edge case with zero retries', async () => {
      const error = new HttpClientError({ message: 'Server Error', status: 500 });

      mockAxiosInstance.get.mockRejectedValueOnce(error);

      await expect(httpClient.get('/test', { retries: 0 })).rejects.toThrow('Server Error');
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
    });

    it('should handle error without status code', async () => {
      const error = new Error('Network Error');

      mockAxiosInstance.get.mockRejectedValueOnce(error);

      await expect(httpClient.get('/test')).rejects.toThrow();
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(4);
    });
  });

  describe('header management', () => {
    let httpClient: HttpClientType;

    beforeEach(() => {
      httpClient = new HttpClient('https://api.test.com');
    });

    it('should set custom header', () => {
      httpClient.setHeader('Custom-Header', 'custom-value');

      expect(mockAxiosInstance.defaults.headers.common['Custom-Header']).toBe('custom-value');
    });

    it('should remove header', () => {
      mockAxiosInstance.defaults.headers.common['Custom-Header'] = 'custom-value';

      httpClient.removeHeader('Custom-Header');

      expect(mockAxiosInstance.defaults.headers.common['Custom-Header']).toBeUndefined();
    });
  });

  describe('interceptors', () => {
    beforeEach(() => {
      new HttpClient('https://api.test.com');
    });

    it('should log request details in request interceptor success', () => {
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0];
      const successHandler = requestInterceptor[0] as (_config: {
        method?: string;
        url?: string;
      }) => {
        method?: string;
        url?: string;
      };
      const config = { method: 'GET', url: '/test' };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const result = successHandler(config);

      expect(result).toBe(config);
      expect(consoleSpy).toHaveBeenCalledWith('🚀 GET /test');

      consoleSpy.mockRestore();
    });

    it('should log response details in response interceptor success', () => {
      const responseInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0];
      const successHandler = responseInterceptor[0] as (_response: {
        status: number;
        config: { url?: string };
      }) => {
        status: number;
        config: { url?: string };
      };
      const response = { status: 200, config: { url: '/test' } };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const result = successHandler(response);

      expect(result).toBe(response);
      expect(consoleSpy).toHaveBeenCalledWith('✅ 200 /test');

      consoleSpy.mockRestore();
    });

    it('should handle request errors with HttpErrorHandler', async () => {
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0];
      const errorHandler = requestInterceptor[1] as (_error: Error) => Promise<never>;
      const testError = new Error('Request error');

      mockHandle.mockReturnValue(new MockHttpClientError({ message: 'Handled error' }));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      try {
        await errorHandler(testError);
      } catch (error) {
        expect(error).toBeInstanceOf(MockHttpClientError);
        expect(mockHandle).toHaveBeenCalledWith(testError);
        expect(consoleSpy).toHaveBeenCalledWith('❌ Request Error:', testError);
      }

      consoleSpy.mockRestore();
    });

    it('should handle response errors with HttpErrorHandler', async () => {
      const responseInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0];
      const errorHandler = responseInterceptor[1] as (_error: {
        response?: { status: number };
        config?: { url?: string };
      }) => Promise<never>;
      const testError = {
        response: { status: 500 },
        config: { url: '/test' },
      };

      mockHandle.mockReturnValue(new MockHttpClientError({ message: 'Handled error' }));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      try {
        await errorHandler(testError);
      } catch (error) {
        expect(error).toBeInstanceOf(MockHttpClientError);
        expect(mockHandle).toHaveBeenCalledWith(testError);
        expect(consoleSpy).toHaveBeenCalledWith('❌ Response Error:', 500, '/test');
      }

      consoleSpy.mockRestore();
    });
  });
});

describe('HttpClient singleton', () => {
  it('should export singleton functions and instance', async () => {
    const httpClientModule = await import('../../services/httpClient');

    expect(typeof httpClientModule.getHttpClient).toBe('function');
    expect(httpClientModule.httpClient).toBeDefined();
    expect(httpClientModule.default).toBeDefined();
  });
});

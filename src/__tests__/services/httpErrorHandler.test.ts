import { AxiosError } from 'axios';
import { HttpErrorHandler, HttpClientError } from '../../services/httpErrorHandler';

describe('HttpErrorHandler', () => {
  describe('handle', () => {
    it('should handle 400 Bad Request error', () => {
      const axiosError = {
        response: {
          status: 400,
          data: { message: 'Invalid input' },
        },
        code: 'BAD_REQUEST',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result).toBeInstanceOf(HttpClientError);
      expect(result.message).toBe('Bad Request - Invalid parameters');
      expect(result.status).toBe(400);
      expect(result.code).toBe('BAD_REQUEST');
      expect(result.data).toEqual({ message: 'Invalid input' });
    });

    it('should handle 401 Unauthorized error', () => {
      const axiosError = {
        response: {
          status: 401,
          data: null,
        },
        code: 'UNAUTHORIZED',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Unauthorized - Authentication required');
      expect(result.status).toBe(401);
    });

    it('should handle 403 Forbidden error', () => {
      const axiosError = {
        response: {
          status: 403,
          data: null,
        },
        code: 'FORBIDDEN',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Forbidden - Access denied');
      expect(result.status).toBe(403);
    });

    it('should handle 404 Not Found error', () => {
      const axiosError = {
        response: {
          status: 404,
          data: null,
        },
        code: 'NOT_FOUND',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Not Found - Resource does not exist');
      expect(result.status).toBe(404);
    });

    it('should handle 429 Too Many Requests error', () => {
      const axiosError = {
        response: {
          status: 429,
          data: null,
        },
        code: 'TOO_MANY_REQUESTS',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Too Many Requests - Rate limit exceeded');
      expect(result.status).toBe(429);
    });

    it('should handle 500 Internal Server Error', () => {
      const axiosError = {
        response: {
          status: 500,
          data: null,
        },
        code: 'INTERNAL_ERROR',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Internal Server Error');
      expect(result.status).toBe(500);
    });

    it('should handle 502 Bad Gateway error', () => {
      const axiosError = {
        response: {
          status: 502,
          data: null,
        },
        code: 'BAD_GATEWAY',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Bad Gateway - Server error');
      expect(result.status).toBe(502);
    });

    it('should handle 503 Service Unavailable error', () => {
      const axiosError = {
        response: {
          status: 503,
          data: null,
        },
        code: 'SERVICE_UNAVAILABLE',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Service Unavailable');
      expect(result.status).toBe(503);
    });

    it('should handle unknown HTTP status codes', () => {
      const axiosError = {
        response: {
          status: 418,
          data: null,
        },
        code: 'TEAPOT',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('HTTP Error 418');
      expect(result.status).toBe(418);
    });

    it('should handle network errors (no response)', () => {
      const axiosError = {
        request: {},
        code: 'NETWORK_ERROR',
        message: 'Network Error',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Network Error - No response received');
      expect(result.code).toBe('NETWORK_ERROR');
      expect(result.status).toBeUndefined();
    });

    it('should handle request configuration errors', () => {
      const axiosError = {
        message: 'Request failed to configure',
        code: 'CONFIG_ERROR',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Request failed to configure');
      expect(result.code).toBe('CONFIG_ERROR');
      expect(result.status).toBeUndefined();
    });

    it('should handle errors without message', () => {
      const axiosError = {
        code: 'UNKNOWN_ERROR',
      } as AxiosError;

      const result = HttpErrorHandler.handle(axiosError);

      expect(result.message).toBe('Request configuration error');
      expect(result.code).toBe('UNKNOWN_ERROR');
    });
  });
});

describe('HttpClientError', () => {
  it('should create error with all properties', () => {
    const errorData = {
      message: 'Test error',
      status: 400,
      code: 'TEST_ERROR',
      data: { test: 'data' },
    };

    const error = new HttpClientError(errorData);

    expect(error.name).toBe('HttpClientError');
    expect(error.message).toBe('Test error');
    expect(error.status).toBe(400);
    expect(error.code).toBe('TEST_ERROR');
    expect(error.data).toEqual({ test: 'data' });
    expect(error).toBeInstanceOf(Error);
  });

  it('should create error with minimal properties', () => {
    const errorData = {
      message: 'Simple error',
    };

    const error = new HttpClientError(errorData);

    expect(error.name).toBe('HttpClientError');
    expect(error.message).toBe('Simple error');
    expect(error.status).toBeUndefined();
    expect(error.code).toBeUndefined();
    expect(error.data).toBeUndefined();
  });
});

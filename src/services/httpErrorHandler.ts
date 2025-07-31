import { AxiosError } from 'axios';
import { HttpError } from '@/types/http';

export class HttpClientError extends Error {
  public status?: number;
  public code?: string;
  public data?: unknown;

  constructor(error: HttpError) {
    super(error.message);
    this.name = 'HttpClientError';
    this.status = error.status;
    this.code = error.code;
    this.data = error.data;
  }
}

export class HttpErrorHandler {
  static handle(error: AxiosError): HttpClientError {
    const status = error.response?.status;
    const data = error.response?.data;

    let message = 'An error occurred';
    let code = error.code;

    if (error.response) {
      switch (status) {
        case 400:
          message = 'Bad Request - Invalid parameters';
          break;
        case 401:
          message = 'Unauthorized - Authentication required';
          break;
        case 403:
          message = 'Forbidden - Access denied';
          break;
        case 404:
          message = 'Not Found - Resource does not exist';
          break;
        case 429:
          message = 'Too Many Requests - Rate limit exceeded';
          break;
        case 500:
          message = 'Internal Server Error';
          break;
        case 502:
          message = 'Bad Gateway - Server error';
          break;
        case 503:
          message = 'Service Unavailable';
          break;
        default:
          message = `HTTP Error ${status}`;
      }
    } else if (error.request) {
      message = 'Network Error - No response received';
      code = 'NETWORK_ERROR';
    } else {
      message = error.message || 'Request configuration error';
      code = error.code || 'REQUEST_ERROR';
    }

    return new HttpClientError({
      message,
      status,
      code,
      data,
    });
  }
}

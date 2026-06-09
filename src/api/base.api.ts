import { APIRequestContext, APIResponse } from '@playwright/test';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

/**
 * BaseApi — generic HTTP wrapper around Playwright's APIRequestContext.
 * All API clients extend this class.
 */
export class BaseApi {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.get(path, {
      headers: options?.headers,
      params: options?.params,
    });
  }

  protected async post(path: string, body: unknown, options?: RequestOptions): Promise<APIResponse> {
    return this.request.post(path, {
      data: body,
      headers: options?.headers,
    });
  }

  protected async put(path: string, body: unknown, options?: RequestOptions): Promise<APIResponse> {
    return this.request.put(path, {
      data: body,
      headers: options?.headers,
    });
  }

  protected async patch(path: string, body: unknown, options?: RequestOptions): Promise<APIResponse> {
    return this.request.patch(path, {
      data: body,
      headers: options?.headers,
    });
  }

  protected async delete(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.delete(path, {
      headers: options?.headers,
    });
  }

  /**
   * Parses the response body as JSON with proper typing.
   */
  protected async parseJson<T>(response: APIResponse): Promise<T> {
    return response.json() as Promise<T>;
  }
}

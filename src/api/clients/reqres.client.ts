import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from '../base.api';

// ─── Response Types ──────────────────────────────────────────────────────────

export interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqResSupport {
  url: string;
  text: string;
}

export interface SingleUserResponse {
  data: ReqResUser;
  support: ReqResSupport;
}

export interface UsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqResUser[];
  support: ReqResSupport;
}

export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

export interface UpdateUserResponse {
  name: string;
  job: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
}

export interface LoginErrorResponse {
  error: string;
}

export interface RegisterSuccessResponse {
  id: number;
  token: string;
}

// ─── Client ──────────────────────────────────────────────────────────────────

/**
 * ReqResClient — typed API client for https://reqres.in
 */
export class ReqResClient extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // ── Users ────────────────────────────────────────────────────────────────

  async getUsers(page = 1): Promise<APIResponse> {
    return this.get('/api/users', { params: { page } });
  }

  async getUserById(id: number): Promise<APIResponse> {
    return this.get(`/api/users/${id}`);
  }

  async createUser(payload: CreateUserRequest): Promise<APIResponse> {
    return this.post('/api/users', payload);
  }

  async updateUser(id: number, payload: Partial<CreateUserRequest>): Promise<APIResponse> {
    return this.put(`/api/users/${id}`, payload);
  }

  async patchUser(id: number, payload: Partial<CreateUserRequest>): Promise<APIResponse> {
    return this.patch(`/api/users/${id}`, payload);
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return this.delete(`/api/users/${id}`);
  }

  // ── Auth ─────────────────────────────────────────────────────────────────

  async login(credentials: LoginRequest): Promise<APIResponse> {
    return this.post('/api/login', credentials);
  }

  async register(credentials: LoginRequest): Promise<APIResponse> {
    return this.post('/api/register', credentials);
  }
}

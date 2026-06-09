import { test, expect } from '../../src/fixtures/base.fixture';
import {
  ReqResClient,
  LoginSuccessResponse,
  LoginErrorResponse,
  RegisterSuccessResponse,
} from '../../src/api/clients/reqres.client';
import { REQRES } from '../../src/utils/test-data';

test.describe('Auth API — ReqRes', () => {
  let client: ReqResClient;

  test.beforeEach(({ apiContext }) => {
    client = new ReqResClient(apiContext);
  });

  // ── TC-API-08 ──────────────────────────────────────────────────────────────
  test('@smoke TC-API-08: POST /api/login with valid credentials returns token', async () => {
    const response = await client.login(REQRES.validLogin);
    expect(response.status()).toBe(200);

    const body: LoginSuccessResponse = await response.json();
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  // ── TC-API-09 ──────────────────────────────────────────────────────────────
  test('TC-API-09: POST /api/login without password returns 400 with error', async () => {
    const response = await client.login({
      email: REQRES.invalidLogin.email,
      password: '',
    });
    expect(response.status()).toBe(400);

    const body: LoginErrorResponse = await response.json();
    expect(body.error).toBeDefined();
    expect(body.error).toContain('Missing password');
  });

  // ── TC-API-10 ──────────────────────────────────────────────────────────────
  test('TC-API-10: POST /api/register with valid credentials returns id and token', async () => {
    const response = await client.register(REQRES.validRegister);
    expect(response.status()).toBe(200);

    const body: RegisterSuccessResponse = await response.json();
    expect(body.id).toBeDefined();
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
  });

  // ── TC-API-11 ──────────────────────────────────────────────────────────────
  test('TC-API-11: POST /api/register without password returns 400', async () => {
    const response = await client.register({
      email: 'unregistered@nowhere.com',
      password: '',
    });
    expect(response.status()).toBe(400);

    const body: LoginErrorResponse = await response.json();
    expect(body.error).toBeDefined();
    expect(body.error).toContain('Missing password');
  });
});

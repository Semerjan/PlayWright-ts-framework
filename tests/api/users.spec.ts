import { test, expect } from '../../src/fixtures/base.fixture';
import { ReqResClient, UsersListResponse, SingleUserResponse, CreateUserResponse, UpdateUserResponse } from '../../src/api/clients/reqres.client';
import { REQRES } from '../../src/utils/test-data';

test.describe('Users API — ReqRes', () => {
  let client: ReqResClient;

  test.beforeEach(({ apiContext }) => {
    client = new ReqResClient(apiContext);
  });

  // ── TC-API-01 ──────────────────────────────────────────────────────────────
  test('@smoke TC-API-01: GET /api/users returns paginated list with status 200', async () => {
    const response = await client.getUsers(1);
    expect(response.status()).toBe(200);

    const body: UsersListResponse = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.page).toBe(1);
    expect(body.per_page).toBeDefined();
    expect(body.total).toBeDefined();
  });

  // ── TC-API-02 ──────────────────────────────────────────────────────────────
  test('@smoke TC-API-02: GET /api/users/:id returns correct user', async () => {
    const response = await client.getUserById(REQRES.validUser.id);
    expect(response.status()).toBe(200);

    const body: SingleUserResponse = await response.json();
    expect(body.data.id).toBe(REQRES.validUser.id);
    expect(body.data.email).toBe(REQRES.validUser.email);
    expect(body.data.first_name).toBe(REQRES.validUser.firstName);
    expect(body.data.last_name).toBe(REQRES.validUser.lastName);
  });

  // ── TC-API-03 ──────────────────────────────────────────────────────────────
  test('TC-API-03: GET /api/users/:id returns 404 for non-existent user', async () => {
    const response = await client.getUserById(REQRES.nonExistentUserId);
    expect(response.status()).toBe(404);
  });

  // ── TC-API-04 ──────────────────────────────────────────────────────────────
  test('@smoke TC-API-04: POST /api/users creates a new user and returns 201', async () => {
    const response = await client.createUser(REQRES.newUser);
    expect(response.status()).toBe(201);

    const body: CreateUserResponse = await response.json();
    expect(body.name).toBe(REQRES.newUser.name);
    expect(body.job).toBe(REQRES.newUser.job);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  // ── TC-API-05 ──────────────────────────────────────────────────────────────
  test('TC-API-05: PUT /api/users/:id updates user and returns 200', async () => {
    const response = await client.updateUser(REQRES.validUser.id, REQRES.updatedUser);
    expect(response.status()).toBe(200);

    const body: UpdateUserResponse = await response.json();
    expect(body.name).toBe(REQRES.updatedUser.name);
    expect(body.job).toBe(REQRES.updatedUser.job);
    expect(body.updatedAt).toBeDefined();

    // updatedAt should be a valid ISO date string
    const updatedAt = new Date(body.updatedAt);
    expect(updatedAt.toString()).not.toBe('Invalid Date');
  });

  // ── TC-API-06 ──────────────────────────────────────────────────────────────
  test('TC-API-06: DELETE /api/users/:id returns 204 No Content', async () => {
    const response = await client.deleteUser(REQRES.validUser.id);
    expect(response.status()).toBe(204);
  });

  // ── TC-API-07 ──────────────────────────────────────────────────────────────
  test('TC-API-07: GET /api/users page 2 returns different users than page 1', async () => {
    const page1 = await client.getUsers(1);
    const page2 = await client.getUsers(2);

    expect(page1.status()).toBe(200);
    expect(page2.status()).toBe(200);

    const body1: UsersListResponse = await page1.json();
    const body2: UsersListResponse = await page2.json();

    const ids1 = body1.data.map((u) => u.id);
    const ids2 = body2.data.map((u) => u.id);

    // No overlap between pages
    const overlap = ids1.filter((id) => ids2.includes(id));
    expect(overlap).toHaveLength(0);
  });
});

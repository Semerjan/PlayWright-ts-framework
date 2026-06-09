import { test, expect } from '../../src/fixtures/base.fixture';
import { ENV }          from '../../src/config/env.config';

test.describe('Login — SauceDemo', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.assertLoginPageVisible();
  });

  // ── TC-UI-01 ────────────────────────────────────────────────────────────────
  test('@smoke TC-UI-01: valid credentials redirect to inventory', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(
      ENV.users.standard.username,
      ENV.users.standard.password,
    );
    await inventoryPage.assertOnInventoryPage();
  });

  // ── TC-UI-02 ────────────────────────────────────────────────────────────────
  test('TC-UI-02: invalid password shows error banner', async ({ loginPage }) => {
    await loginPage.login(ENV.users.standard.username, 'wrong_password');
    await loginPage.assertErrorMessage(
      'Username and password do not match any user in this service',
    );
  });

  // ── TC-UI-03 ────────────────────────────────────────────────────────────────
  test('TC-UI-03: locked-out user shows appropriate error', async ({ loginPage }) => {
    await loginPage.login(
      ENV.users.locked.username,
      ENV.users.locked.password,
    );
    await loginPage.assertErrorMessage('Sorry, this user has been locked out');
  });

  // ── TC-UI-04 ────────────────────────────────────────────────────────────────
  test('TC-UI-04: empty credentials show validation error', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.assertErrorMessage('Username is required');
  });

  // ── TC-UI-05 ────────────────────────────────────────────────────────────────
  test('TC-UI-05: error banner can be dismissed', async ({ loginPage }) => {
    await loginPage.login('bad_user', 'bad_pass');
    await loginPage.assertErrorMessage(/do not match/);
    await loginPage.dismissError();
    await loginPage.assertNoError();
  });
});

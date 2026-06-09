import { test as base, APIRequestContext, request } from '@playwright/test';
import { LoginPage }     from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage }      from '../pages/cart.page';
import { CheckoutPage }  from '../pages/checkout.page';
import { ENV }           from '../config/env.config';

// ─── Fixture Types ───────────────────────────────────────────────────────────

type UiFixtures = {
  loginPage:     LoginPage;
  inventoryPage: InventoryPage;
  cartPage:      CartPage;
  checkoutPage:  CheckoutPage;
  /** Page already authenticated as standard_user */
  authenticatedPage: {
    inventoryPage: InventoryPage;
    cartPage:      CartPage;
    checkoutPage:  CheckoutPage;
  };
};

type ApiFixtures = {
  apiContext: APIRequestContext;
};

// ─── Extended Test ───────────────────────────────────────────────────────────

export const test = base.extend<UiFixtures & ApiFixtures>({
  // ── UI Page Object fixtures ──────────────────────────────────────────────

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  /**
   * Provides a pre-authenticated session so individual tests don't
   * need to repeat the login flow.
   */
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      ENV.users.standard.username,
      ENV.users.standard.password,
    );

    await use({
      inventoryPage: new InventoryPage(page),
      cartPage:      new CartPage(page),
      checkoutPage:  new CheckoutPage(page),
    });
  },

  // ── API request context fixture ──────────────────────────────────────────

  apiContext: async ({}, use) => {
    const ctx = await request.newContext({
      baseURL: ENV.apiBaseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    await use(ctx);
    await ctx.dispose();
  },
});

export { expect } from '@playwright/test';

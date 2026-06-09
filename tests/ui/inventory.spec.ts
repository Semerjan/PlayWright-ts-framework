import { test, expect } from '../../src/fixtures/base.fixture';
import { SORT_OPTIONS } from '../../src/utils/test-data';

test.describe('Inventory — Product Listing', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.inventoryPage.assertOnInventoryPage();
  });

  // ── TC-UI-06 ────────────────────────────────────────────────────────────────
  test('@smoke TC-UI-06: inventory page shows 6 products', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.inventoryPage.assertProductCount(6);
  });

  // ── TC-UI-07 ────────────────────────────────────────────────────────────────
  test('TC-UI-07: sort products by price low→high', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);
    await authenticatedPage.inventoryPage.assertSortedByPriceAscending();
  });

  // ── TC-UI-08 ────────────────────────────────────────────────────────────────
  test('TC-UI-08: sort products by price high→low', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.inventoryPage.sortBy(SORT_OPTIONS.priceHighLow);
    await authenticatedPage.inventoryPage.assertSortedByPriceDescending();
  });

  // ── TC-UI-09 ────────────────────────────────────────────────────────────────
  test('TC-UI-09: sort products by name A→Z', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.inventoryPage.sortBy(SORT_OPTIONS.nameAZ);
    await authenticatedPage.inventoryPage.assertSortedByNameAscending();
  });

  // ── TC-UI-10 ────────────────────────────────────────────────────────────────
  test('TC-UI-10: logout navigates back to login page', async ({
    authenticatedPage,
    loginPage,
  }) => {
    await authenticatedPage.inventoryPage.logout();
    await loginPage.assertLoginPageVisible();
  });
});

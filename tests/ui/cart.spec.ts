import { test, expect } from '../../src/fixtures/base.fixture';
import { PRODUCTS }     from '../../src/utils/test-data';

test.describe('Cart — Add & Remove Products', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.inventoryPage.assertOnInventoryPage();
  });

  // ── TC-UI-11 ────────────────────────────────────────────────────────────────
  test('@smoke TC-UI-11: add product to cart updates badge count', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage } = authenticatedPage;
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.assertCartBadgeCount(1);
  });

  // ── TC-UI-12 ────────────────────────────────────────────────────────────────
  test('TC-UI-12: added product appears in cart', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.addToCartByName(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();

    await cartPage.assertOnCartPage();
    await cartPage.assertItemPresent(PRODUCTS.backpack);
    await cartPage.assertItemPresent(PRODUCTS.bikeLight);
    await cartPage.assertCartItemCount(2);
  });

  // ── TC-UI-13 ────────────────────────────────────────────────────────────────
  test('TC-UI-13: removing product from cart clears it', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.assertItemPresent(PRODUCTS.backpack);

    await cartPage.removeItemByName(PRODUCTS.backpack);
    await cartPage.assertCartEmpty();
  });

  // ── TC-UI-14 ────────────────────────────────────────────────────────────────
  test('TC-UI-14: continue shopping from cart returns to inventory', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage } = authenticatedPage;

    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await inventoryPage.assertOnInventoryPage();
  });
});

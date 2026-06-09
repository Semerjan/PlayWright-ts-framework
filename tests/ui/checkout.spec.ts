import { test, expect } from '../../src/fixtures/base.fixture';
import { InventoryPage } from '../../src/pages/inventory.page';
import { CartPage }      from '../../src/pages/cart.page';
import { CheckoutPage }  from '../../src/pages/checkout.page';
import { PRODUCTS, CHECKOUT } from '../../src/utils/test-data';

test.describe('Checkout — End-to-End Flow', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.inventoryPage.assertOnInventoryPage();
  });

  // ── TC-UI-15 ────────────────────────────────────────────────────────────────
  test('@smoke TC-UI-15: complete checkout flow end-to-end', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage, checkoutPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.assertOnStepOne();
    await checkoutPage.fillAndContinue(CHECKOUT.valid);

    await checkoutPage.assertOnStepTwo();
    await checkoutPage.finish();

    await checkoutPage.assertOrderComplete();
  });

  // ── TC-UI-16 ────────────────────────────────────────────────────────────────
  test('TC-UI-16: missing first name shows validation error', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage, checkoutPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillAndContinue(CHECKOUT.missingFirstName);
    await checkoutPage.assertErrorMessage('First Name is required');
  });

  // ── TC-UI-17 ────────────────────────────────────────────────────────────────
  test('TC-UI-17: missing zip code shows validation error', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage, checkoutPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillAndContinue(CHECKOUT.missingZip);
    await checkoutPage.assertErrorMessage('Postal Code is required');
  });

  // ── TC-UI-18 ────────────────────────────────────────────────────────────────
  test('TC-UI-18: order summary on step 2 shows the correct item', async ({
    authenticatedPage, page,
  }) => {
    const { inventoryPage, cartPage, checkoutPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAndContinue(CHECKOUT.valid);

    await checkoutPage.assertOnStepTwo();
    await expect(page.locator('.inventory_item_name')).toContainText(PRODUCTS.backpack);
  });

  // ── TC-UI-19 ────────────────────────────────────────────────────────────────
  test('TC-UI-19: back home after order returns to inventory', async ({
    authenticatedPage,
  }) => {
    const { inventoryPage, cartPage, checkoutPage } = authenticatedPage;

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAndContinue(CHECKOUT.valid);
    await checkoutPage.finish();
    await checkoutPage.assertOrderComplete();
    await checkoutPage.backHome();

    await inventoryPage.assertOnInventoryPage();
  });
});
